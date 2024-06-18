import { Section } from '@/components/section-label';
import React from 'react';
import {
  FieldErrors,
  FieldValue,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import FormGenerator from '../sign-up/form-generator';

type WelcomeMessageProps = {
  message: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const WelcomeMessage = ({ message, register, errors }: WelcomeMessageProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Section
        label="Greeting message"
        message="Customize your welcome message"
      />
      <div className="lg:w-[500px]">
        <FormGenerator
          placeholder={message}
          inputType="textarea"
          lines={2}
          register={register}
          errors={errors}
          name="welcomeMessage"
          type="text"
        />
      </div>
    </div>
  );
};

export default WelcomeMessage;
