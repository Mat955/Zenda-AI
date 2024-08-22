'use client';

import { useStripe } from '@/hooks/billing/use-billing';
import { Loader } from '../loader';
import { Button } from '../ui/button';

type StripeConnectProps = {
  connected: boolean;
};

export const StripeConnect = ({ connected }: StripeConnectProps) => {
  const { onStripeConnect, onStripeAccountPending } = useStripe();

  return (
    <Button disabled={connected} onClick={onStripeConnect}>
      {onStripeAccountPending ? (
        <Loader />
      ) : connected ? (
        'Connected'
      ) : (
        'Connect to Stripe'
      )}
    </Button>
  );
};
