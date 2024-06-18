import { Section } from '@/components/section-label';
import UploadButton from '@/components/upload-button';
import { BotIcon } from '@/icons/bot-icon';
import Image from 'next/image';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

const EditChabotIcon = ({ register, errors, chatBot }: Props) => {
  return (
    <div className="py-5 flex flex-col gap-5 items-start">
      <Section
        label="Chatbot Icon"
        message="Upload a new icon for your chatbot"
      />
      <UploadButton label="Edit Image" register={register} errors={errors} />
      {chatBot?.icon ? (
        <div className="rounded-full overflow-hidden">
          <Image
            src={`https://ucarecdn.com/${chatBot.icon}/`}
            alt="chatbot icon"
            width={80}
            height={80}
          />
        </div>
      ) : (
        <div className="rounded-full cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis">
          <BotIcon />
        </div>
      )}
    </div>
  );
};

export default EditChabotIcon;
