export const dynamic = 'force-dynamic';
import InfoBar from '@/components/infobar';
import BillingSetting from '@/components/settings/billing-settings';
import ChangePassword from '@/components/settings/change-password';
import DarkModeToggle from '@/components/settings/dark-mode';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10">
        <BillingSetting />
        <DarkModeToggle />
        <ChangePassword />
      </div>
    </>
  );
};

export default Page;
