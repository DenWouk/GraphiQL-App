'use client';

import './Forms.css';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { LangContext } from '@/lib/context/langContext';
import { UserSchemaWithConfirm } from '@/utils/yup';
import { auth } from '@/utils/firebase';
import { languages } from '@/languages/languages';

type authData = {
  email: string;
  password: string;
};

export default function SignUpForm() {
  const context = useContext(LangContext);
  const [error, setError] = useState('');
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
        setError('Email is already in use. Please sign in');
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
      className="form reg-form"
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

      <input
        placeholder={languages.confirmPass[context.language]}
        type="password"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && (
        <p className="error">{errors.confirmPassword.message}</p>
      )}

      <button type="submit">{languages.signUp[context.language]}</button>
      {errors ? <p className="error">{error}</p> : ''}
      <p>{languages.haveAccount[context.language]}</p>
      <Link className="registration-link" href="authorization">
        {`${languages.signIn[context.language]} ❯`}
      </Link>
    </form>
  );
}
