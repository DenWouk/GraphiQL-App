import AuthPageLink from './components/links/AuthPageLink';
import './page.css';

export default function Home() {
  return (
    <main className="main">
      <div className="auth-note-container">
        <h2 className="auth-note-title">Please authorize to access app!</h2>
        <AuthPageLink />
      </div>
    </main>
  );
}
