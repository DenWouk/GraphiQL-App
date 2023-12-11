import Link from 'next/link';
import './Links.css';

export default function MainPageLink() {
  return (
    <Link href="/" className="page-link">
      <span className="link-arrow">To Main Page ❯</span>
    </Link>
  );
}
