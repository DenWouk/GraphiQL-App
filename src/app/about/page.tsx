import Link from 'next/link';
import './about.css';

function About() {
  return (
    <>
      <div className="welcome-page-container">
        <h2 className="welcome-page-title">Welcome to our application</h2>

        <div className="welcome-page-links">
          <Link href="authorization" className="welcome-page-link">
            <span className="link-arrow">Sign In / Sign Up ❯</span>
          </Link>

          <Link href="/" className="welcome-page-link">
            <span className="link-arrow">To Main Page ❯</span>
          </Link>
        </div>

        <div className="welcome-page-content1">
          <h4 className="content-title">About the team:</h4>

          <div className="content-item">
            <img
              className="content-item-img"
              src="/Viktoriya.jpg"
              alt="Developer photo"
            />
            <h5 className="content-item-title">Viktoriya</h5>
            <p className="content-item-about-team">
              Participation in the project:
            </p>
          </div>

          <div className="content-item">
            <img
              className="content-item-img"
              src="/Artem.jpg"
              alt="Developer photo"
            />
            <h5 className="content-item-title">Artem</h5>
            <p className="content-item-about-team">
              Participation in the project:
            </p>
          </div>

          <div className="content-item">
            <img
              className="content-item-img"
              src="/Denis.jpg"
              alt="Developer photo"
            />
            <h5 className="content-item-title">Denis</h5>
            <p className="content-item-about-team">
              Participation in the project:
            </p>
          </div>
        </div>

        <div className="welcome-page-content2">
          <h4 className="content-title">About the App:</h4>
          <p className="content-item-description"></p>
        </div>
      </div>
    </>
  );
}

export default About;
