import {
  onDomainCustomerResponses,
  onGetAllDomainBookings,
} from '@/actions/appointment';
import { onGetDomainProductsAndConnectedAccountId } from '@/actions/payments';
import PortalForm from '@/components/forms/portal/portal-form';
import React from 'react';

type Props = { params: { domainid: string; customerid: string } };

const CustomerPaymentPage = async ({ params }: Props) => {
  const questions = await onDomainCustomerResponses(params.customerid);
  const products = await onGetDomainProductsAndConnectedAccountId(
    params.domainid,
  );

  if (!questions) return null;

  return (
    <PortalForm
      bookings={bookings}
      email={questions.email!}
      domainid={params.domainid}
      products={products?.products}
      stripeId={products?.stripeId!}
      customerId={params.customerid}
      questions={questions.questions}
      type="Payment"
    />
  );
};

export default CustomerSignUpForm;
