'use client';

import { useContext, useEffect } from 'react';
import AuthPageLink from '../components/links/AuthPageLink';
import MainPageLink from '../components/links/MainPageLink';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks/redux';
import './about.css';
import { LangContext } from '../lib/context/langContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/utils/firebase';
import { setAuthUser } from '../lib/redux/reducers/auth';
import { languages } from '../languages/languages';

function About() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authReducer);

  const context = useContext(LangContext);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthUser(user));
      } else {
        dispatch(setAuthUser(null));
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <main className="main">
      <div className="welcome-page-container">
        <div className="welcome-page-links">
          {authUser ? <MainPageLink /> : <AuthPageLink />}
        </div>

        <h2 className="welcome-page-title">
          {languages.aboutTeam[context.language]}
        </h2>

        <div className="welcome-page-content1">
          <div className="content-item">
            <img
              className="content-item-img"
              src="/Viktoriya.jpg"
              alt="Developer photo"
            />
            <h5 className="content-item-title">
              {languages.Viktoriya[context.language]}
            </h5>
            <p className="content-item-about-team">
              {languages.VikaPart[context.language]}
            </p>
          </div>

          <div className="content-item">
            <img
              className="content-item-img"
              src="/Artem.jpg"
              alt="Developer photo"
            />
            <h5 className="content-item-title">
              {languages.Artem[context.language]}
            </h5>
            <p className="content-item-about-team">
              {languages.ArtemPart[context.language]}
            </p>
          </div>

          <div className="content-item">
            <img
              className="content-item-img"
              src="/Denis.jpg"
              alt="Developer photo"
            />
            <h5 className="content-item-title">
              {languages.Denis[context.language]}
            </h5>
            <p className="content-item-about-team">
              {languages.DenPart[context.language]}
            </p>
          </div>
        </div>

        <div className="welcome-page-content2">
          <h4 className="content-title">
            {languages.aboutApp[context.language]}
          </h4>
          <p className="content-item-description"></p>
        </div>
      </div>
    </main>
  );
}

export default About;
