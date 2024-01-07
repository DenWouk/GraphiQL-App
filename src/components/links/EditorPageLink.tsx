import './Links.css';
import Link from 'next/link';
import { useContext } from 'react';
import { LangContext } from '@/lib/context/langContext';
import { languages } from '@/languages/languages';

export default function EditorPageLink() {
  const context = useContext(LangContext);

  return (
    <Link href="editor" className="page-link">
      <span className="link-arrow">{`${
        languages.toEditor[context.language]
      } ❯`}</span>
    </Link>
  );
}
