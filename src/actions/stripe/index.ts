'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-04-10',
});

export const onCreateCustomerPaymentIntentSecret = async (
  amount: number,
  stripeId: string,
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        currency: 'usd',
        amount: amount * 100,
        automatic_payment_methods: {
          enabled: true,
        },
      },
      { stripeAccount: stripeId },
    );

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.error(error);
  }
};
