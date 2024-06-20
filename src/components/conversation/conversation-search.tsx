import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Select } from '../ui/select';

type Props = {
  register: UseFormRegister<FieldValues>;
  domains?:
    | {
        name: string;
        id: string;
        icon: string;
      }[]
    | undefined;
};

const ConversationSearch = ({ register, domains }: Props) => {
  return (
    <div className="flex flex-col py-3">
      <select
        className="px-3 py-4 text-sm border-[1px] rounded-lg mr-5"
        {...register('domain')}
      >
        <option disabled selected>
          Domain Name
        </option>
        {domains?.map((domain) => (
          <option value={domain.id} key={domain.id}>
            {domain.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConversationSearch;
