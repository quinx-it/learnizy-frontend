import * as yup from 'yup';

export const formSchema = yup.object().shape({
  username: yup
    .string()
    .required('Введите email или имя пользователя')
    .test('is-email-or-username', 'Неверный email или никнейм', (value) => {
      if (!value) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9._-]{3,50}$/;
      return emailRegex.test(value) || usernameRegex.test(value);
    }),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .max(100, 'Максимум 100 символов')
    .required('Введите пароль'),
});
