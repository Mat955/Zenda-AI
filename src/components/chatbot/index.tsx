'use client';
import { useChatBot } from '@/hooks/chatbot/use-chatbot';
import React from 'react';

type Props = {};

const AiChatBot = (props: Props) => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
  } = useChatBot();

  return <div>AiChatBot</div>;
};

export default AiChatBot;
