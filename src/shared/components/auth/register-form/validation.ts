import * as yup from 'yup';

export interface RegisterFormValues {
  login: string;
  password: string;
  email: string;
  repeatPassword: string;
  agreement: boolean;
}

export interface VerificationFormValues {
  code: string;
}

export const formSchema = yup.object().shape({
  login: yup
    .string()
    .required('Введите имя пользователя')
    .matches(
      /^[a-zA-Z0-9._-]{3,50}$/,
      'Имя пользователя может содержать только буквы, цифры, ".", "_" и "-"',
    ),
  email: yup
    .string()
    .required('Введите email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Некорректный email'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .max(100, 'Максимум 100 символов')
    .required('Введите пароль'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Повторите пароль'),
  agreement: yup
    .boolean()
    .oneOf([true], 'Нужно принять соглашение')
    .required('Нужно принять соглашение'),
});

export const verificationSchema = yup.object().shape({
  code: yup.string().required('Введите код').length(6, 'Код должен содержать 6 цифр'),
});
