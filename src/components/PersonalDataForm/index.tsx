'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';

import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { useTranslation } from '@/hooks';

import { PersonalDataFormValuesType } from './typings';
import { personalDataSchema } from './validations';

import {
  BlueButton,
  ButtonWrapper,
  ButtonsContainer,
  ErrorText,
  Form,
  FormFieldFullWidth,
  FormGrid,
  RadioGroupContainer,
  WhiteButton,
} from './styles';

const PersonalDataForm: FC = () => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<PersonalDataFormValuesType>({
    resolver: yupResolver(personalDataSchema),
    defaultValues: {
      gender: 'man',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      birthDate: undefined,
      country: '',
      city: '',
    },
  });

  const onSubmit = () => {};

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <RadioGroupContainer>
            <RadioGroup value={field.value} onValueChange={field.onChange}>
              <RadioGroupItem value="man">{t('PERSONAL_DATA_FORM.GENDER.MAN')}</RadioGroupItem>
              <RadioGroupItem value="woman">{t('PERSONAL_DATA_FORM.GENDER.WOMAN')}</RadioGroupItem>
            </RadioGroup>
          </RadioGroupContainer>
        )}
      />
      {errors.gender && <ErrorText>{errors.gender.message}</ErrorText>}

      <FormGrid>
        <Input
          label={t('PERSONAL_DATA_FORM.FIRST_NAME')}
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label={t('PERSONAL_DATA_FORM.LAST_NAME')}
          {...register('lastName')}
          error={errors.lastName?.message}
        />
        <FormFieldFullWidth>
          <Input
            label={t('PERSONAL_DATA_FORM.EMAIL')}
            {...register('email')}
            error={errors.email?.message}
          />
        </FormFieldFullWidth>
        <FormFieldFullWidth>
          <Input
            label={t('PERSONAL_DATA_FORM.ADDRESS')}
            {...register('address')}
            error={errors.address?.message}
          />
        </FormFieldFullWidth>
        <Input
          label={t('PERSONAL_DATA_FORM.PHONE')}
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label={t('PERSONAL_DATA_FORM.BIRTH_DATE')}
              value={field.value}
              onChange={field.onChange}
              error={errors.birthDate?.message}
            />
          )}
        />
        <Input
          label={t('PERSONAL_DATA_FORM.COUNTRY')}
          {...register('country')}
          error={errors.country?.message}
        />
        <Input
          label={t('PERSONAL_DATA_FORM.CITY')}
          {...register('city')}
          error={errors.city?.message}
        />

        <ButtonsContainer>
          <ButtonWrapper>
            <WhiteButton type="reset" onClick={() => reset()}>
              {t('PERSONAL_DATA_FORM.RESET')}
            </WhiteButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <BlueButton type="submit">{t('PERSONAL_DATA_FORM.SUBMIT')}</BlueButton>
          </ButtonWrapper>
        </ButtonsContainer>
      </FormGrid>
    </Form>
  );
};

export default PersonalDataForm;
