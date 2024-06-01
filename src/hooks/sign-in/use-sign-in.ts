import { useToast } from "@/components/ui/use-toast";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schemas";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const useSignInForm = (props: Props) => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (authenticated.status === "complete") {
          await setActive({
            session: authenticated.createdSessionId,
          });
          toast({
            title: "Success",
            description: "You have successfully signed in",
          });
          router.push("/dashboard");
        }
      } catch (error) {
        setLoading(false);
        if (error.errors[0].code === "form_password_incorrect") {
          toast({
            title: "Error",
            description: "email/password is incorrect try again",
          });
        }
      }
    }
  );
};

export default useSignInForm;
