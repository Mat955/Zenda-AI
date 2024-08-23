import { useEffect, useState } from 'react';
import axios from 'axios';
import { onCreateCustomerPaymentIntentSecret } from '@/actions/stripe';
import { useToast } from '@/components/ui/use-toast';
import {
  useElements,
  useStripe as useStripeHook,
} from '@stripe/react-stripe-js';

export const useStripe = () => {
  const [onStripeAccountPending, setOnStripeAccountPending] =
    useState<boolean>(false);

  const onStripeConnect = async () => {
    try {
      setOnStripeAccountPending(true);
      const account = await axios.get(`/api/stripe/connect`);
      if (account) {
        setOnStripeAccountPending(false);
        if (account) {
          window.location.href = account.data.url;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { onStripeConnect, onStripeAccountPending };
};

export const useStripeCustomer = (amount: number, stripeId: string) => {
  const [stripeSecret, setStripeSecret] = useState<string>('');
  const [loadForm, setLoadForm] = useState<boolean>(false);
  const onGetCustomerIntent = async (amount: number) => {
    try {
      setLoadForm(true);
      const intent = await onCreateCustomerPaymentIntentSecret(
        amount,
        stripeId,
      );

      if (intent) {
        setLoadForm(false);
        setStripeSecret(intent.secret!);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetCustomerIntent(amount);
  }, []);

  return { stripeSecret, loadForm };
};

export const useCompleteCustomerPayment = (onNext: () => void) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  const stripe = useStripeHook();
  const elements = useElements();

  const onMakePayment = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return null;
    }

    console.log('no reload');

    try {
      setProcessing(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/settings',
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: error.message,
          description: 'error',
        });
        setProcessing(false);
      }

      if (paymentIntent?.status === 'succeeded') {
        toast({
          title: 'Payment Successful',
          description: 'success',
        });
        onNext();
      }

      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { processing, onMakePayment };
};
