import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";

type Props = {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
};

const TypeSelectionForm = ({ register, userType, setUserType }: Props) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Create and account</h2>
      <p className="text-iridium md:text-sm">
        Tell us about yourself! What do you do? Let&apos;s tailor your <br />
        experience to suit your needs.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="owner"
        title="I am a business owner"
        text="Setting up my account for my company"
      ></UserTypeCard>
    </>
  );
};

export default TypeSelectionForm;
