'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { useRouter } from 'next/navigation';
import Playground from '@/components/playground/Playground';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { setAuthUser } from '@/lib/redux/reducers/auth';
// import { LangContext } from '@/lib/context/langContext';
// import { languages } from '@/languages/languages';
// import AuthPageLink from '@/components/links/AuthPageLink';

export default function Editor() {
  //   const context = useContext(LangContext);
  const { authUser } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  console.log(authUser);
  const router = useRouter();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthUser(user.email));
      } else {
        dispatch(setAuthUser(null));
        router.replace('/');
      }
    });

    return () => {
      listen();
    };
  });

  return (
    <main className="main">
      <Playground />
    </main>
  );
}
