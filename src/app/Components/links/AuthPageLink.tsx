import Link from 'next/link';
import './Links.css';

export default function AuthPageLink() {
  return (
    <Link href="authorization" className="page-link">
      <span className="link-arrow">Sign In / Sign Up ❯</span>
    </Link>
  );
}
