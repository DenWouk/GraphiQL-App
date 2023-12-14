'use client';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from './utils/firebase';
import Link from 'next/link';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out successful');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
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
    </div>
  );
};

export default AuthDetails;
