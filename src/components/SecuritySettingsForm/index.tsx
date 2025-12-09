'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { PasswordInput } from '@/components/PasswordInput';
import { useTranslation } from '@/hooks';

import { createSecuritySettingsSchema, SecuritySettingsFormValuesType } from './const';

import { ButtonWrapper, ButtonsContainer, Form, FormField, FormGrid } from './styles';

const SecuritySettingsForm: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecuritySettingsFormValuesType>({
    resolver: yupResolver(createSecuritySettingsSchema(t)),
    defaultValues: {
      password: '',
      newPassword: '',
      login: '',
    },
  });

  const onSubmit = () => {};

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGrid>
        <FormField>
          <PasswordInput
            label={t('SECURITY_SETTINGS.PASSWORD')}
            {...register('password')}
            error={errors.password?.message}
          />
        </FormField>
        <FormField>
          <PasswordInput
            label={t('SECURITY_SETTINGS.NEW_PASSWORD')}
            {...register('newPassword')}
            error={errors.newPassword?.message}
          />
        </FormField>
        <FormField>
          <Input
            label={t('SECURITY_SETTINGS.LOGIN')}
            {...register('login')}
            error={errors.login?.message}
          />
        </FormField>

        <ButtonsContainer>
          <ButtonWrapper>
            <Button type="reset" variant="white" onClick={() => reset()}>
              {t('SECURITY_SETTINGS.DONT_SAVE')}
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button type="submit" variant="blue">
              {t('SECURITY_SETTINGS.SAVE_CHANGES')}
            </Button>
          </ButtonWrapper>
        </ButtonsContainer>
      </FormGrid>
    </Form>
  );
};

export default SecuritySettingsForm;
