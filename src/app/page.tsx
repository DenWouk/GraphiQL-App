'use client';

import { useContext } from 'react';
import AuthPageLink from './components/links/AuthPageLink';
import { LangContext } from './store/langContext';
import { languages } from './languages/languages';
import './page.css';

export default function Home() {
  const context = useContext(LangContext);

  return (
    <main className="main">
      <div className="auth-note-container">
        <h2 className="auth-note-title">
          {languages.autorize[context.language]}
        </h2>
        <AuthPageLink />
      </div>
    </main>
  );
}
