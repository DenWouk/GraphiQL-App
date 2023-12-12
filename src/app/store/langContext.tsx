'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface LangContextInterface {
  language: number;
  setLanguage: Dispatch<SetStateAction<number>>;
}

interface LangContextProviderProps {
  children: ReactNode;
}

export const LangContext = createContext<LangContextInterface>({
  language: 0,
  setLanguage: () => {},
});

export const LangContextProvider = ({ children }: LangContextProviderProps) => {
  const [language, setLanguage] = useState(0);

  useEffect(() => {
    setLanguage(Number(localStorage.getItem('language')) || 0);
  }, []);

  return (
    <LangContext.Provider value={{ language, setLanguage }}>
      {children}
    </LangContext.Provider>
  );
};
