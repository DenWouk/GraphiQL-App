'use client';

import './Forms.css';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LangContext } from '@/lib/context/langContext';
import { UserSchemaWithoutConfirm } from '@/utils/yup';
import { auth } from '@/utils/firebase';
import { languages } from '@/languages/languages';

type authData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const context = useContext(LangContext);
  const [error, setError] = useState('');

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
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid credential. Try again or sign up');
      } else {
        console.log(error.code);
      }
    });
  };

  const handleInputChange = async () => {
    setError('');
  };

  return (
    <form
      className="form auth-form"
      onSubmit={handleSubmit(onSubmit)}
      onBlur={handleInputChange}
    >
      <input placeholder="email" {...register('email')} />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        placeholder={languages.pass[context.language]}
        type="password"
        {...register('password')}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit">{languages.signIn[context.language]}</button>
      {errors ? <p className="error">{error}</p> : ''}
      <p>{languages.notAccount[context.language]}</p>
      <Link className="registration-link" href="registration">
        {`${languages.register[context.language]} ❯`}
      </Link>
    </form>
  );
}
