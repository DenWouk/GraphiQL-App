'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/lib/redux/hooks/redux';
import { useRouter } from 'next/navigation';
import Playground from '@/components/playground/Playground';

// import { LangContext } from '@/lib/context/langContext';
// import { languages } from '@/languages/languages';
// import AuthPageLink from '@/components/links/AuthPageLink';

export default function Editor() {
  //   const context = useContext(LangContext);
  const { authUser } = useAppSelector((state) => state.authReducer);
  const router = useRouter();
  useEffect(() => {
    if (!authUser) {
      router.replace('/');
    }
  });

  return <main className="main">{authUser && <Playground />}</main>;
}
