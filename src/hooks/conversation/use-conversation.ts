import {
  onGetChatMessages,
  onGetDomainChatRooms,
  onOwnerSendMessage,
  onRealTimeChat,
  onViewUnReadMessages,
} from '@/actions/conversation';
import { useChatContext } from '@/context/user-chat-context';
import { getMonthName, pusherClient } from '@/lib/utils';
import {
  ChatBotMessageSchema,
  ConversationSearchSchema,
} from '@/schemas/conversation.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { use, useEffect, useRef, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

export const useConversation = () => {
  const { register, watch } = useForm({
    resolver: zodResolver(ConversationSearchSchema),
    mode: 'onChange',
  });

  const { setLoading: loadMessages, setChats, setChatRoom } = useChatContext();
  const [chatRooms, setChatRooms] = useState<
    {
      chatRoom: {
        id: string;
        createdAt: Date;
        message: {
          message: string;
          createdAt: Date;
          seen: boolean;
        }[];
      }[];
      email: string | null;
    }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const search = watch(async (value) => {
      setLoading(true);
      try {
        const rooms = await onGetDomainChatRooms(value.domain);

        if (rooms) {
          setLoading(false);
          setChatRooms(rooms.customer);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => search.unsubscribe();
  }, [watch]);

  const onGetActiveChatMessages = async (id: string) => {
    try {
      loadMessages(true);
      const messages = await onGetChatMessages(id);

      if (messages) {
        setChatRoom(id);
        loadMessages(false);
        setChats(messages[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    register,
    loading,
    chatRooms,
    onGetActiveChatMessages,
  };
};

export const useChatTime = (createdAt: Date, roomId: string) => {
  const { chatRoom } = useChatContext();
  const [messageSentAt, setMessageSentAt] = useState<string>();
  const [urgent, setUrgent] = useState<boolean>(false);

  const onSetMessageRecievedDate = useCallback(() => {
    const dt = new Date(createdAt);
    const current = new Date();
    const currentDate = current.getDate();
    const hr = dt.getHours();
    const min = dt.getMinutes();
    const sec = dt.getSeconds();
    const date = dt.getDate();
    const month = dt.getMonth();
    const difference = currentDate - date;

    if (difference <= 0) {
      setMessageSentAt(`${hr}:${min}${hr > 12 ? 'PM' : 'AM'}`);
      if (current.getHours() - hr < 2) {
        setUrgent(true);
      }
    } else {
      setMessageSentAt(`${date} ${getMonthName(month)}`);
    }
  }, [createdAt]);

  const onSeenChat = useCallback(() => {
    if (chatRoom === roomId && urgent) {
      onViewUnReadMessages(roomId);
      setUrgent(false);
    }
  }, [chatRoom, roomId, urgent]);

  useEffect(() => {
    onSeenChat();
  }, [onSeenChat]);

  useEffect(() => {
    onSetMessageRecievedDate();
  }, [onSetMessageRecievedDate]);

  return {
    messageSentAt,
    urgent,
    onSeenChat,
  };
};

export const useChatWindow = () => {
  const { chats, loading, setChats, chatRoom } = useChatContext();
  const messageWindowRef = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit, reset } = useForm({
    mode: 'onChange',
    resolver: zodResolver(ChatBotMessageSchema),
  });

  const onScrollToBottom = () => {
    messageWindowRef.current?.scrollTo({
      top: messageWindowRef.current.scrollHeight,
      behavior: 'smooth',
      left: 0,
    });
  };

  useEffect(() => {
    onScrollToBottom();
  }, [chats, messageWindowRef]);

  useEffect(() => {
    if (chatRoom) {
      pusherClient.subscribe(chatRoom);
      pusherClient.bind('realtime-mode', (data: any) => {
        setChats((prev) => [...prev, data.chat]);
      });

      return () => pusherClient.unsubscribe('realtime-mode');
    }
  }, [chatRoom]);

  const onHandleSentMessage = handleSubmit(async (values) => {
    try {
      reset();
      const message = await onOwnerSendMessage(
        chatRoom!,
        values.content,
        'assistant',
      );
      // WIP: Remove this line
      if (message) {
        //remove this
        // setChats((prev) => [...prev, message.message[0]])

        await onRealTimeChat(
          chatRoom!,
          message.message[0].message,
          message.message[0].id,
          'assistant',
        );
      }
    } catch (error) {
      console.log(error);
    }
  });

  return {
    messageWindowRef,
    chats,
    loading,
    chatRoom,
    onHandleSentMessage,
    register,
  };
};
