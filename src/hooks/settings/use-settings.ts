import { useEffect, useState } from 'react';
import {
  onChatBotImageUpdate,
  onCreateHelpDeskQuestion,
  onDeleteUserDomain,
  onGetAllHelpDeskQuestions,
  onUpdateDomain,
  onUpdatePassword,
  onUpdateWelcomeMessage,
} from '@/actions/settings';
import { useToast } from '@/components/ui/use-toast';
import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from '@/schemas/auth.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadClient } from '@uploadcare/upload-client';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import {
  DomainSettingsProps,
  DomainSettingsSchema,
  HelpDeskQuestionsProps,
  HelpDeskQuestionsSchema,
} from '@/schemas/settings.schema';
import { useRouter } from 'next/navigation';
import { set } from 'date-fns';

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

export const useThemeMode = () => {
  const { theme, setTheme } = useTheme();
  return { theme, setTheme };
};

export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onChange',
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await onUpdatePassword(values.password);
      if (updated) {
        reset();
        setLoading(false);
        toast({
          title: 'Password Updated',
          description: updated.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    errors,
    onChangePassword,
    loading,
  };
};

export const useSettings = (id: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(DomainSettingsSchema),
  });
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const onUpdateSettings = handleSubmit(async (values) => {
    setLoading(true);
    if (values.domain) {
      const domain = await onUpdateDomain(id, values.domain);

      if (domain) {
        toast({
          title: 'Domain Updated',
          description: domain.message,
        });
      }
    }
    if (values.image[0]) {
      const uploaded = await upload.uploadFile(values.image[0]);
      const image = await onChatBotImageUpdate(id, uploaded.uuid);
      if (image) {
        toast({
          title: image.status === 200 ? 'Image Updated' : 'Error',
          description: image.message,
        });
        setLoading(false);
      }
    }
    if (values.welcomeMessage) {
      const message = await onUpdateWelcomeMessage(id, values.welcomeMessage);
      if (message) {
        toast({
          title: 'Welcome Message Updated',
          description: message.message,
        });
      }
    }
    reset();
    router.refresh();
    setLoading(false);
  });

  const onDeleteDomain = async () => {
    setDeleting(true);
    const deleted = await onDeleteUserDomain(id);
    if (deleted) {
      toast({
        title: 'Domain Deleted',
        description: deleted.message,
      });
      setDeleting(false);
      router.refresh();
    }
  };
  return {
    register,
    errors,
    onUpdateSettings,
    onDeleteDomain,
    loading,
    deleting,
  };
};

export const useHelpDesk = (id: string) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<HelpDeskQuestionsProps>({
    resolver: zodResolver(HelpDeskQuestionsSchema),
  });
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestions, setIsQuestions] = useState<
    { id: string; question: string; answer: string }[]
  >([]);
  const onSubmitQuestion = handleSubmit(async (values) => {
    setLoading(true);
    const question = await onCreateHelpDeskQuestion(
      id,
      values.question,
      values.answer,
    );
    if (question) {
      setIsQuestions(question.questions!);
      toast({
        title: question.status == 200 ? 'Success' : 'Error',
        description: question.message,
      });
      setLoading(false);
      reset();
    }
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const questions = await onGetAllHelpDeskQuestions(id);
    if (questions) {
      setIsQuestions(questions.questions);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  // film 4:32

  return {
    register,
    onSubmitQuestion,
    errors,
    isQuestions,
    loading,
  };
};
