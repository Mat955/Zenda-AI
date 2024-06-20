import { cn, extractUUIDFromString } from '@/lib/utils';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from 'lucide-react';

type Props = {
  message: {
    role: 'assistant' | 'user';
    content: string;
    link?: string;
  };
  createdAt: Date;
};

const Bubble = ({ message, createdAt }: Props) => {
  const date = new Date();
  const image = extractUUIDFromString(message.content);

  return (
    <div
      className={cn(
        'flex gap-2 items-end',
        message.role === 'assistant'
          ? 'self-start'
          : 'self-end flex-row-reverse',
      )}
    >
      {message.role === 'assistant' ? (
        <Avatar className="w-5 h-5">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-5 h-5">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Bubble;
