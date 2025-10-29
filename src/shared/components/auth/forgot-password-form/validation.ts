import * as yup from 'yup';

export const formSchema = yup.object().shape({
  email: yup.string().required('Введите email').email('Некорректный email'),
});
