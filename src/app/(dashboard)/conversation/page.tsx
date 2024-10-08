export const dynamic = 'force-dynamic';

import { onGetAllAccountDomains } from '@/actions/settings';
import ConversationMenu from '@/components/conversation';
import Messanger from '@/components/conversation/messanger';
import InfoBar from '@/components/infobar';
import { Separator } from '@/components/ui/separator';
import React from 'react';

type Props = {};

const ConversationPage = async (props: Props) => {
  const domain = await onGetAllAccountDomains();
  return (
    <div className="w-full h-full flex">
      <ConversationMenu domains={domain?.domains} />
      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <div className="px-5">
          <InfoBar />
        </div>
        <Messanger />
      </div>
    </div>
  );
};

export default ConversationPage;
