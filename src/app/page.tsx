'use client';

import './page.css';
import { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { LangContext } from '@/lib/context/langContext';
import { auth } from '@/utils/firebase';
import { setAuthUser } from '@/lib/redux/reducers/auth';
import AuthPageLink from '@/components/links/AuthPageLink';
import { languages } from '@/languages/languages';
import RegPageLink from '@/components/links/RegPageLink';
import EditorPageLink from '@/components/links/EditorPageLink';
import Image from 'next/image';

export default function About() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authReducer);

  const context = useContext(LangContext);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthUser(user.email));
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
          {authUser ? (
            <EditorPageLink />
          ) : (
            <>
              <AuthPageLink />
              <RegPageLink />
            </>
          )}
        </div>

        <h2 className="main-page-title">
          {languages.welcome[context.language]}
        </h2>

        <h2 className="welcome-page-title">
          {languages.aboutTeam[context.language]}
        </h2>

        <div className="welcome-page-content1">
          <div className="content-item">
            <Image
              className="content-item-img"
              src="/Viktoriya.jpg"
              alt="Developer photo"
              width={175}
              height={175}
            />
            <h5 className="content-item-title">
              {languages.Viktoriya[context.language]}
            </h5>
            <p className="content-item-about-team">
              {languages.VikaPart[context.language]}
            </p>
          </div>

          <div className="content-item">
            <Image
              className="content-item-img"
              src="/Artem.jpg"
              alt="Developer photo"
              width={175}
              height={175}
            />
            <h5 className="content-item-title">
              {languages.Artem[context.language]}
            </h5>
            <p className="content-item-about-team">
              {languages.ArtemPart[context.language]}
            </p>
          </div>

          <div className="content-item">
            <Image
              className="content-item-img"
              src="/Denis.jpg"
              alt="Developer photo"
              width={175}
              height={175}
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
