type IntegrationsListItemProps = {
  id: string;
  name: 'stripe';
  logo: string;
  description: string;
  title: string;
  modalDescription: string;
};

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: '1',
    name: 'stripe',
    description:
      'Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.',
    logo: 'e0bd30d7-d86f-4d1a-9729-2bee08202092',
    title: 'Connect Stripe Account',
    modalDescription:
      'The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.',
  },
];
