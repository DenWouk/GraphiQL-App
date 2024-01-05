'use client';

import './Header.css';
import Link from 'next/link';
import { useContext, useEffect, useRef } from 'react';
import { LanguageSelector } from '../selectors/LanguageSelector';
import { languages } from '@/languages/languages';
import { LangContext } from '@/lib/context/langContext';
import { signOut } from 'firebase/auth';
import { useAppSelector } from '@/lib/redux/hooks/redux';
import { auth } from '../../utils/firebase';

export default function Header() {
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
        {authUser && (
          <>
            <Link className="nav-link" href="/">
              {languages.about[context.language]}
            </Link>

            <Link className="nav-link" href="editor">
              {languages.editor[context.language]}
            </Link>
          </>
        )}
      </nav>

      <div className="header-btns">
        {authUser ? (
          <>
            <p className="user-name">{authUser}</p>
            <button className="nav-btn" onClick={userSignOut}>
              {languages.signOut[context?.language]}
            </button>
          </>
        ) : (
          <>
            <Link href="authorization">
              <button className="nav-btn">
                {languages.signIn[context?.language]}
              </button>
            </Link>
          </>
        )}
        <LanguageSelector />
      </div>
    </header>
  );
}
