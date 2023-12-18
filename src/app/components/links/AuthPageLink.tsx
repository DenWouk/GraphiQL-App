import Link from 'next/link';
import { useContext } from 'react';
import { LangContext } from '@/app/lib/context/langContext';
import { languages } from '@/app/languages/languages';
import './Links.css';

export default function AuthPageLink() {
  const context = useContext(LangContext);

  return (
    <Link href="authorization" className="page-link">
      <span className="link-arrow">{`${languages.signIn[context.language]} / ${
        languages.signUp[context.language]
      } ❯`}</span>
    </Link>
  );
}
