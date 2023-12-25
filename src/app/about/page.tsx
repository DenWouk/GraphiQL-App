import AuthPageLink from '../../components/links/AuthPageLink';
import MainPageLink from '../../components/links/MainPageLink';
import './about.css';

function About() {
  return (
    <main className="main">
      <div className="welcome-page-container">
        <h2 className="welcome-page-title">Welcome to our application</h2>

        <div className="welcome-page-links">
          <AuthPageLink />
          <MainPageLink />
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
    </main>
  );
}

export default About;
