'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UserSchemaWithoutConfirm } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

type authData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const router = useRouter();
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
    console.log(data);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
    router.push('/');
  };

  return (
    <form className="submit" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register('email')} />
      {errors.email && <p className="error">{errors.email.message}</p>}
      <input placeholder="Password" type="password" {...register('password')} />
      {errors.password && <p className="error">{errors.password.message}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
