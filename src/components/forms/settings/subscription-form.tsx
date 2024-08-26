'use client';
import { Loader } from '@/components/loader';
import { StripeELements } from '@/components/settings/stripe-elements';
import SubscriptionCard from '@/components/settings/subscription-card';
import { Button } from '@/components/ui/button';
import { useSubscriptionPlan } from '@/hooks/billing/use-billing';
import React from 'react';

type Props = {
	plan: 'STANDARD' | 'PRO' | 'ULTIMATE';
};

const SubscriptionPlan = ({ plan }: Props) => {
	const { loading, onSetPayment, payment, onUpdateToFreeTier } =
		useSubscriptionPlan(plan);

	return (
		<Loader loading={loading}>
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-3">
					<SubscriptionCard
						title="STANDARD"
						description="For small teams looking to get started"
						price="0"
						payment={payment}
						onPayment={onSetPayment}
						id="STANDARD"
					/>
					<SubscriptionCard
						title="PRO"
						description="For bigger teams looking to grow"
						price="15"
						payment={payment}
						onPayment={onSetPayment}
						id="PRO"
					/>
					<SubscriptionCard
						title="ULTIMATE"
						description="For large teams looking to scale"
						price="40"
						payment={payment}
						onPayment={onSetPayment}
						id="ULTIMATE"
					/>
				</div>
				<StripeELements payment={payment} />
				{payment === 'STANDARD' && (
					<Button onClick={onUpdateToFreeTier}>
						<Loader loading={loading}>Confirm</Loader>
					</Button>
				)}
			</div>
		</Loader>
	);
};

export default SubscriptionPlan;
