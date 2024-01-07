import './Links.css';
import Link from 'next/link';
import { useContext } from 'react';
import { LangContext } from '@/lib/context/langContext';
import { languages } from '@/languages/languages';

export default function RegPageLink() {
  const context = useContext(LangContext);

  return (
    <Link href="registration" className="page-link">
      <span className="link-arrow">{`${
        languages.signUp[context.language]
      } ❯`}</span>
    </Link>
  );
}
