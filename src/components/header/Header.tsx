'use client';

import Link from 'next/link';
import { useContext, useEffect, useRef } from 'react';
import { LanguageSelector } from '../language-selector/LanguageSelector';
import { languages } from '@/languages/languages';
import { LangContext } from '@/lib/context/langContext';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { auth } from '../../utils/firebase';
import { setAuthUser } from '@/lib/redux/reducers/auth';
import './Header.css';

const Header = () => {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authReducer);

  const context = useContext(LangContext);
  const headerRef = useRef<HTMLElement | null>(null);

  const userSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  const isSticky = () => {
    const scrollTop = window.scrollY;

    scrollTop >= 0 && headerRef.current?.classList.add('sticky');
    scrollTop <= 0 && headerRef.current?.classList.remove('sticky');
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(setAuthUser(user.email));
      } else {
        dispatch(setAuthUser(null));
      }
    });

    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Link href="/">
        <h1 className="header-title">GraphiQL</h1>
      </Link>
      <nav className="nav">
        <Link className="nav-link" href="/">
          {languages.main[context.language]}
        </Link>

        <Link className="nav-link" href="about">
          {languages.about[context.language]}
        </Link>
      </nav>

      <div className="header-btns">
        <div className="auth-btns">
          {authUser ? (
            <>
              <p>{authUser}</p>
              <button onClick={userSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <Link className="nav-link" href="authorization">
                Sign In
              </Link>
            </>
          )}
        </div>

        <div className="selectors-container">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
