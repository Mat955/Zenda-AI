import { onBookNewAppointment } from '@/actions/appointment';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const usePortal = (
  customerId: string,
  domainid: string,
  email: string,
) => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { toast } = useToast();
  const [step, setStep] = useState<number>(2);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);

  setValue('date', date);

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onPrev = () => {
    setStep((prev) => prev - 1);
  };

  const onBookAppointment = handleSubmit(async () => {
    try {
      setLoading(true);
      const booked = await onBookNewAppointment(
        domainId,
        customerId,
        values.slot,
        values.date,
        email,
      );

      if (booked && booked.status === 200) {
        setLoading(false);
        toast({
          title: 'Success',
          description: booked.message,
        });
        setStep(3);
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  });
};
