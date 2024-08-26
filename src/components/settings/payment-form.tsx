import { useCompleteCustomerPayment } from '@/hooks/billing/use-billing';
import React from 'react';
import { CardDescription } from '../ui/card';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '../ui/button';
import { Loader } from '../loader';

type PaymentFormProps = {
	plan: 'STANDARD' | 'PRO' | 'ULTIMATE';
};

const PaymentForm = ({ plan }: PaymentFormProps) => {
	const { processing, onMakePayment } = useCompleteCustomerPayment(plan);

	return (
		<form
			onSubmit={onMakePayment}
			className="flex flex-col gap-5"
		>
			<div>
				<h2 className="font-semibold text-xl text-black">Payment Method</h2>
				<CardDescription>Enter your card details</CardDescription>
			</div>
			<PaymentElement />
			<Button type="submit">
				<Loader loading={processing}>Pay</Loader>
			</Button>
		</form>
	);
};

export default PaymentForm;
