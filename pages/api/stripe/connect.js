import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-06-20',
});

export default async function handler(
  req = NextApiRequest,
  res = NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const account = await stripe.accounts.create({
        type: 'express',
      });
      res.status(200).json({ account });
    } catch (err) {
      res.status(500).json({
        error: `An error occurred when calling the Stripe API to create an account: ${err.message}`,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
