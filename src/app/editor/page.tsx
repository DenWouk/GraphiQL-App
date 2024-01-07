'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/lib/redux/hooks/redux';
import { useRouter } from 'next/navigation';
import Playground from '@/components/playground/Playground';

export default function Editor() {
  const { authUser } = useAppSelector((state) => state.authReducer);
  const router = useRouter();
  useEffect(() => {
    if (!authUser) {
      router.replace('/');
    }
  });

  return <main className="main">{authUser && <Playground />}</main>;
}
