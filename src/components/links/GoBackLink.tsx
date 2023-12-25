import './Links.css';
import Link from 'next/link';
import { useContext } from 'react';
import { LangContext } from '@/lib/context/langContext';
import { languages } from '@/languages/languages';

export default function GoBackLink() {
  const context = useContext(LangContext);

  return (
    <Link href="/" className="page-link">
      <span className="link-arrow">{`${
        languages.goBack[context.language]
      } ❯`}</span>
    </Link>
  );
}
