import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldError, FieldValue, UseFormRegister } from "react-hook-form";

type Props = {
  type: "text" | "email" | "password";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldError<FieldValue> | undefined;
  lines?: number;
  form?: string;
};

const FormGenerator = ({
  type,
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  lines,
  form,
}: Props) => {
  switch (inputType) {
    case "input":
    default:
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            form={form}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
  }

  return <div>FormGenerator</div>;
};

export default FormGenerator;
