'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks/redux';
import SignInForm from '@/components/forms/SignInForm';
import GoBackLink from '@/components/links/GoBackLink';

export default function Authorization() {
  const router = useRouter();
  const { authUser } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    const checkAuthStatus = async () => {
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
          <SignInForm />
        </>
      )}
    </main>
  );
}
