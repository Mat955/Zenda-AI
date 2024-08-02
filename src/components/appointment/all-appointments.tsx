import { APPOINTMENT_TABLE_HEADER } from '@/constants/menu';
import React from 'react';
import DataTable from '../table';

type Props = {
  bookings:
    | {
        Customer: {
          Domain: {
            name: string;
          } | null;
        } | null;
        id: string;
        email: string;
        domainId: string | null;
        date: Date;
        slot: string;
        createdAt: Date;
      }[]
    | undefined;
};

const AllAppointments = ({ bookings }: Props) => {
  return <DataTable headers={APPOINTMENT_TABLE_HEADER}></DataTable>;
};

export default AllAppointments;
