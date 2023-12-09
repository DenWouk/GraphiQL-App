import Link from 'next/link';
import './Header.css';

const Header = () => {
  return (
    <header className={'header'}>
      <h1 className="header-title">GraphiQL</h1>

      <div className="selectors-container">
        {/* <ThemeSelector />
        <LanguageSelector /> */}
      </div>

      <nav className="nav">
        <Link className={'nav-link'} href="/">
          Main
          {/* {languages.startPage[state.languageIndex]} */}
        </Link>

        <button className={'nav-link'}>1 </button>

        <Link className={'nav-link'} href="profile">
          2{' '}
        </Link>

        <Link className={'nav-link'} href="/logout">
          3{' '}
        </Link>
      </nav>

      {/* <MediaQuery maxWidth={640}>
        <BurgerMenu />
      </MediaQuery> */}
    </header>
  );
};
export default Header;
