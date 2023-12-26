'use client';

import { ChangeEvent, useContext } from 'react';
import { LangContext } from '@/lib/context/langContext';
import './LanguageSelector.css';

export function LanguageSelector() {
  const context = useContext(LangContext);

  function handleLanguageSelector(event: ChangeEvent<HTMLSelectElement>): void {
    context.setLanguage(Number(event.target.value));
    localStorage.setItem('language', event.target.value);
  }

  return (
    // languages option values: EN=0, BY=1, RU=2 UA=3;

    <select
      className="language-select"
      name="select"
      value={context.language}
      onChange={handleLanguageSelector}
    >
      <option value={0}>EN</option>
      <option value={1}>BY</option>
      <option value={2}>RU</option>
      <option value={3}>UA</option>
    </select>
  );
}
