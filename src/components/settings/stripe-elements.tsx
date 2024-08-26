'use-client';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Loader } from '../loader';
import { Elements } from '@stripe/react-stripe-js';
import { useStripeElements } from '@/hooks/billing/use-billing';
import PaymentForm from './payment-form';

type StripeELementsProps = {
	payment: 'STANDARD' | 'PRO' | 'ULTIMATE';
};

export const StripeELements = ({ payment }: StripeELementsProps) => {
	const StripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

	const { stripeSecret, loadForm } = useStripeElements(payment);

	console.log(payment);

	return (
		stripeSecret &&
		StripePromise &&
		(payment === 'PRO' || payment === 'ULTIMATE') && (
			<Loader loading={loadForm}>
				<Elements
					stripe={StripePromise}
					options={{
						clientSecret: stripeSecret,
					}}
				>
					<PaymentForm plan={payment} />
				</Elements>
			</Loader>
		)
	);
};
