import { toast, useToast } from '@/components/ui/use-toast';
import { AddDomainSchema } from '@/schemas/settings.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadClient } from '@uploadcare/react-uploader';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Field, FieldValues, useForm } from 'react-hook-form';

const upload = new UploadClient({
  publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string,
});

export const useDomain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(AddDomainSchema),
  });

  const pathname = usePathname();
  const { tost } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    setIsDomain(pathname.split('/').pop());
  }, [pathname]);

  const onAddDomain = handleSubmit(async (values: FieldValues) => {
    setLoading(true);
    const uploaded = await upload.uploadFile(values.image[0]);
    const domain = await onIntegrateDomain(values.domain, uploaded.uuid);

    if (domain) {
      reset();
      setLoading(false);
      toast({
        title: domain.status === 200 ? 'Success' : 'Error',
        message: domain.message,
      });
      router.refresh();
    }
  });

  return {
    register,
    onAddDomain,
    loading,
    isDomain,
    errors,
  };
};
