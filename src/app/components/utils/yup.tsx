import * as yup from 'yup';

const commonSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email should contain "@'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters long')
    .matches(/\d/, 'Password should contain at least one digit.')
    .matches(/[A-Z]/, 'Password should contain at least one uppercase letter.')
    .matches(/[a-z]/, 'Password should contain at least one lowercase letter.')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password should contain at least one special character.'
    ),
});

export const UserSchemaWithConfirm = commonSchema.shape({
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords should match'),
});

export const UserSchemaWithoutConfirm = commonSchema;

export type UserTypeWithConfirm = yup.InferType<typeof UserSchemaWithConfirm>;
export type UserTypeWithoutConfirm = yup.InferType<
  typeof UserSchemaWithoutConfirm
>;
