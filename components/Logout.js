'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Button from './Button';

export default function Logout() {
  const { logOut, currentUser } = useAuth();
  const pathname = usePathname();

  if (!currentUser) {
    return null;
  }

  if (pathname === '/') {
    return (
      <Link href={'/dashboard'}>
        <Button text="Go to dashboard" />
      </Link>
    );
  }

  return <Button text="Logout" clickHandler={logOut} />;
}
