'use client';

import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UserSchemaWithConfirm } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useAppSelector } from '@/app/lib/redux/hooks/redux';
import Link from 'next/link';
import { LangContext } from '@/app/lib/context/langContext';
import { languages } from '@/app/languages/languages';
import './Forms.css';

type authData = {
  email: string;
  password: string;
};

const SignUpForm = () => {
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
    resolver: yupResolver(UserSchemaWithConfirm),
    mode: 'onChange',
  });

  const onSubmit = async (data: authData) => {
    const { email, password } = data;
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('такой пользователь уже есть');
      } else {
        console.log(error);
      }
    });
  };

  if (authUser) {
    return null;
  }

  return (
    <form className="form reg-form" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="email" {...register('email')} />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        placeholder={languages.pass[context.language]}
        type="password"
        {...register('password')}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <input
        placeholder={languages.confirmPass[context.language]}
        type="password"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && (
        <p className="error">{errors.confirmPassword.message}</p>
      )}

      <button type="submit">{languages.signUp[context.language]}</button>

      <p>{languages.haveAccount[context.language]}</p>
      <Link className="registration-link" href="authorization">
        {`${languages.signIn[context.language]} ❯`}
      </Link>
    </form>
  );
};

export default SignUpForm;
