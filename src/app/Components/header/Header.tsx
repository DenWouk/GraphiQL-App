import Link from 'next/link';
import './Header.css';
import { LanguageSelector } from '../language-selector/LanguageSelector';

const Header = () => {
  return (
    <header className="header">
      <Link href="/">
        <h1 className="header-title">GraphiQL</h1>
      </Link>

      <nav className="nav">
        <Link className="nav-link" href="/">
          Main
        </Link>

        <Link className="nav-link" href="about">
          About
        </Link>
      </nav>

      <div className="header-btns">
        <div className="auth-btns">
          <Link href="authorization">
            <button className="auth-btn">Sign In</button>
          </Link>

          <button className="auth-btn">Logout</button>
        </div>

        <div className="selectors-container">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
export default Header;
