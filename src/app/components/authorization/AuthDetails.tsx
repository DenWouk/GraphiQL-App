'use client';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../lib/hooks/redux';
import { setAuthUser } from '../../lib/reducers/auth';

const AuthDetails = () => {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthUser(user));
      } else {
        dispatch(setAuthUser(null));
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  return (
    <>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <Link className="nav-link" href="registration">
            Sign Up
          </Link>
          <Link className="nav-link" href="authorization">
            Sign In
          </Link>
        </>
      )}
    </>
  );
};

export default AuthDetails;
