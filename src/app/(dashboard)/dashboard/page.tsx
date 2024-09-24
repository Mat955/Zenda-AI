import { getUserAppointments } from '@/actions/appointment';
import {
  getUserBalance,
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrices,
  getUserTransactions,
} from '@/actions/dashboard';
import DashboardCard from '@/components/dashboard/cards';
import PlanUsage from '@/components/dashboard/plan-usage';
import InfoBar from '@/components/infobar';
import CalIcon from '@/icons/cal-icon';
import EmailIcon from '@/icons/email-icon';
import MoneyIcon from '@/icons/money-icon';
import PersonIcon from '@/icons/person-icon';
import { CalendarIcon, DollarSignIcon } from 'lucide-react';
import React from 'react';

type Props = {};

const Dashboard = async (props: Props) => {
  const clients = await getUserClients();
  const sales = await getUserBalance();
  const appointments = await getUserAppointments();
  const plan = await getUserPlanInfo();
  const transactions = await getUserTransactions();
  const products = await getUserTotalProductPrices();

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <div className="flex gap-5 flex-wrap">
          <DashboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<PersonIcon />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Pipline Value"
            icon={<MoneyIcon />}
          />
          <DashboardCard
            value={appointments || 0}
            title="Appointments"
            icon={<CalIcon />}
          />
          <DashboardCard
            value={sales || 0}
            sales
            title="Total Sales"
            icon={<DollarSignIcon />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
          <div>
            <div>
              <h2 className="font-bold text-2xl">Plan Usage</h2>
              <p className="text-sm font-light">
                A detailed overview of your metrics, usage and more data.
              </p>
            </div>
            <PlanUsage
              plan={plan?.plan}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>
          <div className="flex flex-col"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
