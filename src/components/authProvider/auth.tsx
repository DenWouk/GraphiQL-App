'use client';
import { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/lib/redux/reducers/auth';
import { auth } from '../../utils/firebase';
import { Loader } from '@/components/loader/loader';

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        dispatch(setAuthUser(user.email));
      } else {
        dispatch(setAuthUser(null));
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader></Loader>;
  }
  return <>{children}</>;
};

export default AuthWrapper;
