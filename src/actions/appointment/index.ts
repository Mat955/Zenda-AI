'use server';

import { client } from '@/lib/prisma';

export const onDomainCustomerResponses = async (customerid: string) => {
  try {
    const customerQuestions = await client.customer.findUnique({
      where: {
        id: customerid,
      },
      select: {
        email: true,
        questions: {
          select: {
            id: true,
            question: true,
            answered: true,
          },
        },
      },
    });

    if (customerQuestions) {
      return customerQuestions;
    }
  } catch (error) {
    console.error(error);
  }
};

export const onGetAllDomainBookings = async (domainid: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        domainId,
      },
      select: {
        slot: true,
        date: true,
      },
    });

    if (bookings) {
      return bookings;
    }
  } catch (error) {
    console.error(error);
  }
};

export const onBookNewAppointment = async (
  domainId: string,
  customerId: string,
  slot: string,
  date: string,
  email: string,
) => {
  try {
    const booking = await client.customer.update({
      where: {
        id: customerId,
      },
      data: {
        booking: {
          create: {
            domainId,
            slot,
            date,
            email,
          },
        },
      },
    });

    if (booking) {
      return {
        status: 200,
        message: 'Appointment booked successfully',
      };
    }
  } catch (error) {
    console.error(error);
  }
};
