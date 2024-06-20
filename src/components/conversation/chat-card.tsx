'use client';
import React from 'react';

type Props = {
  title: string;
  description?: string;
  createdAt: Date;
  id: string;
  onChat(): void;
  seen?: boolean;
};

const ChatCard = (props: Props) => {
  const { messageSentAt, urgent } = useChatTime(createdAt, id);
  return <div>ChatCard</div>;
};

export default ChatCard;
