import { useToast } from '@/components/ui/use-toast';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useChatContext } from './user-chat-context';
import { onToggleRealtime } from '@/actions/conversation';

type Props = {};

const useSideBar = (props: Props) => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { chatRoom } = useChatContext();

  const onActivateRealtime = async (e: any) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom!,
        (e.target.ariaChecked = 'true' ? 'false' : true),
      );
      if (realtime) {
        setRealtime(realtime.chatRoom.live);
        toast({
          title: 'Success',
          description: realtime.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>useSideBar</div>;
};

export default useSideBar;
