import * as yup from 'yup'

export interface AuthFormValues {
  username: string
  password: string
}

export const formSchema = yup.object().shape({
  username: yup
  .string()
  .required('Введите email или имя пользователя')
  .test('is-email-or-username', 'Неверный email или никнейм', (value) => {
    if (!value) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/
    return emailRegex.test(value) || usernameRegex.test(value)
  }),
  password: yup.string().min(6, 'Минимум 6 символов').required('Введите пароль'),
})
