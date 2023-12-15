import Link from 'next/link';
import './Links.css';

export default function AuthPageLink() {
  return (
    <>
      <Link href="registration" className="page-link">
        <span className="link-arrow">Sign Up</span>
      </Link>
      <Link href="authorization" className="page-link">
        <span className="link-arrow">Sign In</span>
      </Link>
    </>
  );
}
