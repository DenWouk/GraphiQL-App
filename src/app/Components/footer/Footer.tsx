import { ghSvg } from './gh-logo';
import { rssSvg } from './rss-logo';
import './Footer.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={'footer'}>
      <div className="footer-items">
        <p className={'footer-item'}>©</p>
        <p className={'footer-item'}>2023</p>
      </div>

      <div className="footer-items">
        <Link
          className="gh-link"
          href="https://github.com/Vikki100621"
          rel="noopener noreferrer"
          target="_blank"
        >
          {ghSvg()}
          <p className={'gh-title'}>Viktoriya</p>
        </Link>

        <Link
          className="gh-link"
          href="https://github.com/Zhiznevski"
          rel="noopener noreferrer"
          target="_blank"
        >
          {ghSvg()}
          <p className={'gh-title'}>Artem</p>
        </Link>

        <Link
          className="gh-link"
          href="https://github.com/DenWouk"
          rel="noopener noreferrer"
          target="_blank"
        >
          {ghSvg()}
          <p className={'gh-title'}>Denis</p>
        </Link>
      </div>

      <Link
        className="rss-link"
        href="https://rs.school/react/"
        rel="noreferrer"
        target="_blank"
      >
        <svg className={'rss-logo'} viewBox="0 0 552.8 205.3">
          {rssSvg()}
        </svg>
      </Link>
    </footer>
  );
}
