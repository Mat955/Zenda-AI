import TabsMenu from '@/components/tabs';
import { HELP_DESK_TABS_MENU } from '@/constants/menu';
import React from 'react';
import HelpDesk from './help-desk';
import { TabsContent } from '@/components/ui/tabs';

type Props = {
  id: string;
};

const BotTrainingForm = ({ id }: Props) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h5 className="font-bold text-2xl">Bot Training</h5>
        <p className="text-sm font-light">
          Set FAQ question, create questions for capturing lead information and
          train your bot to act the way you want it to.
        </p>
      </div>
      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent value="help desk" className="w-full">
          <HelpDesk id={id} />
        </TabsContent>
        <TabsContent value="questions">
          {/* <FilterQuestions id={id} /> */}
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default BotTrainingForm;
