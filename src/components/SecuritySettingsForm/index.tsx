'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { PasswordInput } from '@/components/PasswordInput';

import { securitySettingsSchema, SecuritySettingsFormValuesType } from './validation';

import { ButtonWrapper, ButtonsContainer, Form, FormField, FormGrid } from './styles';

const SecuritySettingsForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecuritySettingsFormValuesType>({
    resolver: yupResolver(securitySettingsSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      login: '',
    },
  });

  const onSubmit = () => {
    // TODO: Implement form submission
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        <FormField>
          <PasswordInput
            label="Пароль"
            {...register('password')}
            error={errors.password?.message}
          />
        </FormField>
        <FormField>
          <PasswordInput
            label="Новый пароль"
            {...register('newPassword')}
            error={errors.newPassword?.message}
          />
        </FormField>
        <FormField>
          <Input
            label="Логин (Email или телефон)"
            {...register('login')}
            error={errors.login?.message}
          />
        </FormField>

        <ButtonsContainer>
          <ButtonWrapper>
            <Button type="reset" variant="white" onClick={() => reset()}>
              Не сохранять
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button type="submit" variant="blue">
              Сохранить изменения
            </Button>
          </ButtonWrapper>
        </ButtonsContainer>
      </FormGrid>
    </Form>
  );
};

export default SecuritySettingsForm;
