import * as yup from 'yup'

export const securitySettingsSchema = yup.object({
  password: yup
    .string()
    .required('Введите текущий пароль')
    .min(8, 'Минимум 8 символов')
    .matches(/[A-Za-z]/, 'Пароль должен содержать буквы')
    .matches(/\d/, 'Пароль должен содержать цифры'),

  newPassword: yup
    .string()
    .required('Введите новый пароль')
    .min(8, 'Минимум 8 символов')
    .matches(/[A-Za-z]/, 'Пароль должен содержать буквы')
    .matches(/\d/, 'Пароль должен содержать цифры')
    .notOneOf([yup.ref('password')], 'Новый пароль не должен совпадать с текущим'),

  login: yup
    .string()
    .required('Введите логин')
    .test('email-or-username', 'Введите корректный email или username', (value) => {
      if (!value) return false
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
      return emailRegex.test(value) || usernameRegex.test(value)
    }),
})

export type SecuritySettingsFormValues = yup.InferType<typeof securitySettingsSchema>