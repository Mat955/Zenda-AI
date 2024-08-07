'use client';
import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { INTEGRATION_LIST_ITEMS } from '@/constants/integrations';

type Props = {
  connections: {
    stripe: boolean;
  };
};

const IntegrationsList = ({ connections }: Props) => {
  return (
    <div className="flex-1 h-0 grid grid-cols-1 content-start lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {INTEGRATION_LIST_ITEMS.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col p-5 gap-2">
            <div className="flex w-full justify-between items.start gap-x-20">
              <div>
                <div className="w-10 h-10 relative">
                  <Image
                    sizes="100vw"
                    src={`https://ucarecdn.com/${item.logo}/`}
                    alt="Logo"
                    fill
                  />
                </div>
                <h2 className="font-bold capitalize">{item.name}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IntegrationsList;
