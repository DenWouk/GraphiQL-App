'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UserSchemaWithConfirm } from '../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

type authData = {
  email: string;
  password: string;
};

const SignUpForm = () => {
  const router = useRouter();
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
    createUserWithEmailAndPassword(auth, email, password)
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
