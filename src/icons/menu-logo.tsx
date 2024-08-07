import Image from 'next/image';
import React from 'react';

type MenuLogoProps = {
  onClick(): void;
};

export const MenuLogo = ({ onClick }: MenuLogoProps) => {
  return (
    <Image
      src={`https://ucarecdn.com/b1141fa6-8616-4df8-8475-dfb6a1d5ab42/`}
      onClick={onClick}
      width={20}
      height={20}
      alt="Zenda"
    />
  );
};
