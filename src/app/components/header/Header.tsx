'use client';

import Link from 'next/link';
import { useContext, useEffect, useRef } from 'react';
import { LanguageSelector } from '../language-selector/LanguageSelector';
import { languages } from '@/app/languages/languages';
import { LangContext } from '@/app/store/langContext';
import './Header.css';
import AuthDetails from '../authorization/AuthDetails';

const Header = () => {
  const context = useContext(LangContext);
  const headerRef = useRef<HTMLElement | null>(null);

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
        <Link className="nav-link" href="/">
          {languages.main[context.language]}
        </Link>

        <Link className="nav-link" href="about">
          {languages.about[context.language]}
        </Link>
      </nav>

      <div className="header-btns">
        <div className="auth-btns">
          <AuthDetails></AuthDetails>
        </div>
        <div className="selectors-container">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
