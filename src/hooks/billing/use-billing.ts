import axios from 'axios';
import { useState } from 'react';

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
