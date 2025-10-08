'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { PersonalDataFormValuesType, personalDataSchema } from './validation';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radioGroup';
import { Input } from '@/shared/ui/input';
import { DatePicker } from '@/shared/ui/datePicker';
import { Button } from '@/shared/ui/button';

export const PersonalDataForm = () => {
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
            <RadioGroupItem value="man">Мужчина</RadioGroupItem>
            <RadioGroupItem value="woman">Женщина</RadioGroupItem>
          </RadioGroup>
        )}
      />
      {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

      <div className="grid grid-cols-2 grid-rows-[repeat(5,1fr)_auto] gap-x-4 gap-y-8">
        <Input label="Имя" {...register('firstName')} error={errors.firstName?.message} />
        <Input label="Фамилия" {...register('lastName')} error={errors.lastName?.message} />
        <Input
          label="Email"
          className="col-span-2"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Адрес"
          className="col-span-2"
          {...register('address')}
          error={errors.address?.message}
        />
        <Input label="Номер" {...register('phone')} error={errors.phone?.message} />
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Дата рождения"
              value={field.value}
              onChange={field.onChange}
              error={errors.birthDate?.message}
            />
          )}
        />
        <Input label="Страна" {...register('country')} error={errors.country?.message} />
        <Input label="Город" {...register('city')} error={errors.city?.message} />

        <Button type="reset" variant="white" className="flex-1 text-[16px]" onClick={() => reset()}>
          Не сохранять
        </Button>
        <Button type="submit" variant="blue" className="flex-1 text-[16px]">
          Сохранить изменения
        </Button>
      </div>
    </form>
  );
};
