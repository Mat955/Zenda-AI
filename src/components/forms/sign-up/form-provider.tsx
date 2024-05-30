import { AuthContextProvider } from "@/context/use-auth-context";
import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  // return (
  //   <AuthContextProvider>
  //     <FormProvider></FormProvider>
  //   </AuthContextProvider>
  // );
};

export default SignUpFormProvider;
