'use client';
import Link from 'next/link';
import React from 'react';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

export default function CallToAction() {
  const { currentUser } = useAuth();
  if (currentUser) {
    return (
      <div className="max-w-[600p] mx-auto">
        <Link href={'/dashboard'}>
          <Button dark text="Go to dashboard" />
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 mx-auto">
      <Link href={'/dashboard'}>
        <Button text="sign up" />
      </Link>
      <Link href={'/dashboard'}>
        <Button text="login" dark />
      </Link>
    </div>
  );
}
