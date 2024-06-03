import { onGetSubscriptionPlan } from '@/actions/settings';
import React from 'react';

type Props = {};

const BillingSetting = async (props: Props) => {
	const plan = await onGetSubscriptionPlan();

	return <div className="grid grid-cols-1 lg:grid-cols-5 gap-18"></div>;
};

export default BillingSetting;
