import { onGetAllBookingsForCurrentUser } from '@/actions/appointment';
import AllAppointments from '@/components/appointment/all-appointments';
import InfoBar from '@/components/infobar';
import { currentUser } from '@clerk/nextjs';
import React from 'react';

type Props = {};

const Page = async (props: Props) => {
  const user = await currentUser();

  if (!user) return null;
  const domainBookings = await onGetAllBookingsForCurrentUser(user.id);
  const today = new Date();

  return (
    <>
      <InfoBar />
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
        <div className="lg:col-span-2 overflow-y-auto">
          <AllAppointments bookings={domainBookings?.bookings} />
        </div>
      </div>
    </>
  );
};

export default Page;
