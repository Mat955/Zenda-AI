import Image from 'next/image';
import React from 'react';

const PortalBanner = () => {
  return (
    <div className="w-full bg-muted flex justify-center py-5">
      <Image
        src="/images/logo.png"
        alt="logo"
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        height={0}
        width={0}
      />
    </div>
  );
};

export default PortalBanner;
