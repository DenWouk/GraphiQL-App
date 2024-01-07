import { render, screen, fireEvent } from '@testing-library/react';
import { LangContext } from '@/lib/context/langContext';
import React from 'react';
import { LanguageSelector } from '@/components/selectors/LanguageSelector';

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
});

test('renders LanguageSelector component', () => {
  const setLanguageMock = jest.fn();
  const contextValue = { language: 0, setLanguage: setLanguageMock };

  render(
    <LangContext.Provider value={contextValue}>
      <LanguageSelector />
    </LangContext.Provider>
  );

  const languageSelect = screen.getByRole('combobox');

  expect(languageSelect).toBeInTheDocument();
  expect(languageSelect).toHaveValue('0');
});

test('handles language change on selection', () => {
  const setLanguageMock = jest.fn();
  const contextValue = { language: 0, setLanguage: setLanguageMock };

  render(
    <LangContext.Provider value={contextValue}>
      <LanguageSelector />
    </LangContext.Provider>
  );

  const languageSelect = screen.getByRole('combobox');

  fireEvent.change(languageSelect, { target: { value: '2' } });

  expect(setLanguageMock).toHaveBeenCalledWith(2);
});
