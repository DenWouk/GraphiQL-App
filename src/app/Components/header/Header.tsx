'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { LanguageSelector } from '../language-selector/LanguageSelector';
import './Header.css';

const Header = () => {
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
  });

  return (
    <header className="header" ref={headerRef}>
      <Link href="/">
        <h1 className="header-title">GraphiQL</h1>
      </Link>

      <nav className="nav">
        <Link className="nav-link" href="/">
          Main
        </Link>

        <Link className="nav-link" href="about">
          About
        </Link>
      </nav>

      <div className="header-btns">
        <div className="auth-btns">
          <Link href="authorization">
            <button className="auth-btn">Sign In</button>
          </Link>

          <button className="auth-btn">Logout</button>
        </div>

        <div className="selectors-container">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
