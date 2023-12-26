import './Links.css';
import Link from 'next/link';
import { useContext } from 'react';
import { LangContext } from '@/lib/context/langContext';
import { languages } from '@/languages/languages';

export default function AuthPageLink() {
  const context = useContext(LangContext);

  return (
    <Link href="authorization" className="page-link">
      <span className="link-arrow">{`${
        languages.signIn[context.language]
      } ❯`}</span>
    </Link>
  );
}
