import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type Props = {
  size: 'max' | 'min';
  label: string;
  icon: JSX.Element;
  path?: string;
  current?: string;
  onSignOut?(): void;
};

const MenuItem = ({ size, label, icon, path, current, onSignOut }: Props) => {
  switch (size) {
    case 'max':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center gap-2 px-1 py-2 rounded-lg my-1',
            !current
              ? 'text-gray-500 hover:bg-slate-100 dark:hover:bg-muted'
              : current === path
              ? 'bg-white font-bold text-black dark:bg-muted dark:text-white hover:bg-white dark:hover:bg-muted cursor-pointer'
              : 'text-gray-500 hover:bg-slate-100 dark:hover:bg-muted',
          )}
          href={path ? `/${path}` : '#'}
        >
          {icon} {label}
        </Link>
      );
    case 'min':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center gap-2 px-1 py-2 rounded-lg my-1',
            !current
              ? 'text-gray-500 hover:bg-slate-100 dark:hover:bg-muted'
              : current === path
              ? 'bg-white font-bold text-black dark:bg-muted dark:text-white hover:bg-white dark:hover:bg-muted cursor-pointer'
              : 'text-gray-500 hover:bg-slate-100 dark:hover:bg-muted',
          )}
          href={path ? `/${path}` : '#'}
        >
          {icon}
        </Link>
      );
    default:
      return null;
  }
};

export default MenuItem;
