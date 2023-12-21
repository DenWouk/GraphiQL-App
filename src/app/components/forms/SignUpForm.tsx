'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UserSchemaWithConfirm } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useAppSelector } from '@/app/lib/redux/hooks/redux';

type authData = {
  email: string;
  password: string;
};

const SignUpForm = () => {
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
    <form className="submit" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register('email')} />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input placeholder="Password" type="password" {...register('password')} />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <input
        placeholder="Confirm password"
        type="password"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && (
        <p className="error">{errors.confirmPassword.message}</p>
      )}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
