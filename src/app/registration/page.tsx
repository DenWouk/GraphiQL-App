'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks/redux';
import GoBackLink from '@/components/links/GoBackLink';
import SignUpForm from '@/components/forms/SignUpForm';

export default function Authorization() {
  const router = useRouter();
  const { authUser } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (authUser) {
        router.replace('/');
      }
    };

    checkAuthStatus();
  }, [authUser, router]);

  return (
    <main className="main">
      {!authUser && (
        <>
          <div className="link-wrapper">
            <GoBackLink />
          </div>
          <SignUpForm />
        </>
      )}
    </main>
  );
}
