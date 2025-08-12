import * as yup from 'yup'

export interface AuthFormValues {
  login: string
  password: string
  agreement: boolean
}

export const formSchema = yup.object().shape({
  login: yup
  .string()
  .required('Введите email или имя пользователя')
  .test('is-email-or-username', 'Неверный email или никнейм', (value) => {
    if (!value) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/
    return emailRegex.test(value) || usernameRegex.test(value)
  }),
  password: yup.string().min(6, 'Минимум 6 символов').required('Введите пароль'),
  agreement: yup
    .boolean()
    .oneOf([true], 'Нужно принять соглашение')
    .required('Нужно принять соглашение'),
})
