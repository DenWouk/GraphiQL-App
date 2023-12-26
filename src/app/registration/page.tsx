'use client';

import './registration.css';
import SignUpForm from '@/components/forms/SignUpForm';
import GoBackLink from '@/components/links/GoBackLink';
import { useAppSelector } from '@/lib/redux/hooks/redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Registration() {
  const router = useRouter();
  const { authUser } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (authUser) {
      router.replace('editor');
    }
  }, [authUser, router]);

  return (
    <main className="main">
      <div className="link-wrapper">
        <GoBackLink />
      </div>

      <SignUpForm />
    </main>
  );
}
