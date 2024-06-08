import { onLoginUser } from '@/actions/auth';
import SideBar from '@/components/sidebar';
import { ChatProvider } from '@/context/user-chat-context';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser();
  if (!authenticated) return null;

  return (
    <ChatProvider>
      <div className="flex h-screen w-full">
        <SideBar domains={authenticated.domain} />
        <div className="w-full h-screen flex flex-col py-3 pr-10 pl-20 md:px-10">
          {children}
        </div>
      </div>
    </ChatProvider>
  );
};

export default OwnerLayout;
