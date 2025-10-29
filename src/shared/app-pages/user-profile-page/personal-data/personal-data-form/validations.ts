import * as yup from 'yup';

export const personalDataSchema = yup.object({
  gender: yup
    .string()
    .oneOf(['man', 'woman'], 'Выберите "Мужчина" или "Женщина"')
    .required('Выберите пол'),
  firstName: yup.string().required('Введите имя'),
  lastName: yup.string().required('Введите фамилию'),
  email: yup.string().email('Некорректный email').required('Введите email'),
  address: yup.string().required('Введите адрес'),
  phone: yup
    .string()
    .transform((value) => {
      if (!value) return '';
      const cleaned = value.trim().replace(/[^\d+]/g, '');
      if (cleaned.startsWith('+')) return cleaned;
      return '+' + cleaned;
    })
    .matches(
      /^(\+375|80)(25|29|33|44)\d{7}$|^\+7\d{10}$/,
      'Некорректный номер (РБ: +375(XX)XXX-XX-XX, РФ: +7XXXXXXXXXX)',
    )
    .required('Введите номер'),
  birthDate: yup.date().nullable().required('Выберите дату рождения'),
  country: yup.string().required('Введите страну'),
  city: yup.string().required('Введите город'),
});
