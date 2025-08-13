import * as yup from 'yup'

export interface ResetPasswordFormValues {
  password: string
  repeatPassword: string
}

export const formSchema = yup.object().shape({
  password: yup.string().min(8, 'Минимум 8 символов').required('Введите пароль'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Повторите пароль'),
})
