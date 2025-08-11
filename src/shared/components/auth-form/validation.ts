import * as yup from 'yup';

export const formSchema = yup.object({
  email: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
  password: yup.string().required('Пароль обязателен').min(8, 'Минимум 8 символов'),
});

export type AuthFormValues = {
  email: string;
  password: string;
};
