'use client';

import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UserSchemaWithoutConfirm } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import Link from 'next/link';
import { useAppSelector } from '@/app/lib/redux/hooks/redux';
import { LangContext } from '@/app/lib/context/langContext';
import { languages } from '@/app/languages/languages';
import './Forms.css';

type authData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const context = useContext(LangContext);

  const router = useRouter();
  const { authUser } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (authUser) {
      router.replace('/');
    }
  }, [authUser, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchemaWithoutConfirm),
    mode: 'onChange',
  });

  const onSubmit = async (data: authData) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log(error);
    });
  };

  if (authUser) {
    return null;
  }

  return (
    <form className="form auth-form" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="email" {...register('email')} />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        placeholder={languages.pass[context.language]}
        type="password"
        {...register('password')}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit">{languages.signIn[context.language]}</button>

      <p>{languages.notAccount[context.language]}</p>
      <Link className="registration-link" href="registration">
        {`${languages.register[context.language]} ❯`}
      </Link>
    </form>
  );
};

export default SignInForm;
