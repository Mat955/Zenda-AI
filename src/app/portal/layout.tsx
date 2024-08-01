import PortalBanner from '@/components/portal/banner';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <PortalBanner />
      <div className="container flex justify-center flex-1 h-0">{children}</div>
    </>
  );
};

export default Layout;
