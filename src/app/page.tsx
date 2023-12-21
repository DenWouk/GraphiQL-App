'use client';

import { useContext, useEffect } from 'react';
import AuthPageLink from './components/links/AuthPageLink';
import { LangContext } from './lib/context/langContext';
import { languages } from './languages/languages';
import { useAppDispatch, useAppSelector } from './lib/redux/hooks/redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setAuthUser } from './lib/redux/reducers/auth';
import { auth } from './components/utils/firebase';
import './page.css';
import Playground from './components/playground/Playground';

export default function Home() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authReducer);
  console.log(authUser);

  const context = useContext(LangContext);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthUser(user.email));
      } else {
        dispatch(setAuthUser(null));
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <main className="main">
      {authUser ? (
        <div className="main-container">
          <h2 className="main-page-title">
            {languages.welcome[context.language]}
          </h2>
          <Playground />
        </div>
      ) : (
        <div className="auth-note-container">
          <h2 className="auth-note-title">
            {languages.autorize[context.language]}
          </h2>
          <AuthPageLink />
        </div>
      )}
    </main>
  );
}
