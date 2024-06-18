'use client';
import { Section } from '@/components/section-label';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useHelpDesk } from '@/hooks/settings/use-settings';
import React from 'react';

type Props = {
  id: string;
};

const HelpDesk = ({ id }: Props) => {
  const { register, errors, onSubmitQuestion, isQuestions, loading } =
    useHelpDesk(id);
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Help Desk</CardTitle>
        <form className="flex flex-col gap-6 mt-10" onSubmit={onSubmitQuestion}>
          <div className="flex flex-col gap-3">
            <Section
              label="Question"
              message="Add a question that you believe is frequently asked."
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default HelpDesk;
