export const dynamic = 'force-dynamic';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();

  if (user) redirect('/');

  return (
    <div className="h-screen flex w-full justify-center">
      <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
        <Image
          src="/images/logo.png"
          alt="Logo"
          sizes="100vw"
          style={{
            width: '20%',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Welcome, Im your AI powered assistant, Zenda!
        </h2>
        <p className="text-iridium md:text-sm mb-10">
          Zenda is here to help you with any questions you may have. Just ask!
          <br />
          something never done before
        </p>
      </div>
    </div>
  );
};

export default Layout;
