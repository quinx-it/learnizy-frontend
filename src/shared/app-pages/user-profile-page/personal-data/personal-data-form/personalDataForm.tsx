'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalDataSchema } from './validations';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radioGroup';
import { Input } from '@/shared/ui/input';
import { DatePicker } from '@/shared/ui/datePicker';
import { Button } from '@/shared/ui/button';
import { PersonalDataFormValuesType } from './typings';
import { useTranslation } from 'react-i18next';

export const PersonalDataForm = () => {
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

  const onSubmit = (data: PersonalDataFormValuesType) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange} className="mb-8">
            <RadioGroupItem value="man">{t('PERSONAL_DATA_FORM.GENDER.MAN')}</RadioGroupItem>
            <RadioGroupItem value="woman">{t('PERSONAL_DATA_FORM.GENDER.WOMAN')}</RadioGroupItem>
          </RadioGroup>
        )}
      />
      {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

      <div className="grid grid-cols-2 grid-rows-[repeat(5,1fr)_auto] gap-x-4 gap-y-8">
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
        <Input
          label={t('PERSONAL_DATA_FORM.EMAIL')}
          className="col-span-2"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label={t('PERSONAL_DATA_FORM.ADDRESS')}
          className="col-span-2"
          {...register('address')}
          error={errors.address?.message}
        />
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

        <Button type="reset" variant="white" className="flex-1 text-[16px]" onClick={() => reset()}>
          {t('PERSONAL_DATA_FORM.RESET')}
        </Button>
        <Button type="submit" variant="blue" className="flex-1 text-[16px]">
          {t('PERSONAL_DATA_FORM.SUBMIT')}
        </Button>
      </div>
    </form>
  );
};
