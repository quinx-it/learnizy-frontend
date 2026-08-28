'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { useEffect, type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  type ICurrentUserResponse,
} from '@/api/endpoints/user';
import DatePicker from '@/components/DatePicker';
import Input from '@/components/Input';
import { RadioGroup, RadioGroupItem } from '@/components/RadioGroup';
import { showToast } from '@/components/Toaster';
import { useTranslation } from '@/hooks';

import { createPersonalDataSchema } from './const';
import { type PersonalDataFormValuesType } from './typings';

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

const toFormValues = (user?: ICurrentUserResponse): PersonalDataFormValuesType => ({
  gender: user?.gender === 'FEMALE' ? 'woman' : 'man',
  firstName: user?.firstName ?? '',
  lastName: user?.lastName ?? '',
  email: user?.email ?? '',
  address: user?.address ?? '',
  phone: user?.phone ?? '',
  birthDate: user?.birthDate ? new Date(user.birthDate) : (undefined as unknown as Date),
  country: user?.country ?? '',
  city: user?.city ?? '',
});

const PersonalDataForm: FC = () => {
  const { t } = useTranslation();

  const { data: user } = useGetCurrentUserQuery();
  const [updateCurrentUser, { isLoading: isSaving }] = useUpdateCurrentUserMutation();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<PersonalDataFormValuesType>({
    resolver: yupResolver(createPersonalDataSchema(t)),
    defaultValues: toFormValues(),
  });

  useEffect(() => {
    if (user) reset(toFormValues(user));
  }, [user, reset]);

  const onSubmit = async (values: PersonalDataFormValuesType) => {
    try {
      await updateCurrentUser({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender === 'woman' ? 'FEMALE' : 'MALE',
        phone: values.phone,
        address: values.address,
        birthDate: values.birthDate ? format(values.birthDate, 'yyyy-MM-dd') : undefined,
        country: values.country,
        city: values.city,
      }).unwrap();

      showToast('success', t('PERSONAL_DATA_FORM.SAVED'), '');
    } catch {
      showToast('error', t('COMMON.SAVE_ERROR'), '');
    }
  };

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
            <WhiteButton
              type="button"
              disabled={isSaving}
              onClick={() => reset(toFormValues(user))}
            >
              {t('PERSONAL_DATA_FORM.RESET')}
            </WhiteButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <BlueButton type="submit" disabled={isSaving}>
              {t('PERSONAL_DATA_FORM.SUBMIT')}
            </BlueButton>
          </ButtonWrapper>
        </ButtonsContainer>
      </FormGrid>
    </Form>
  );
};

export default PersonalDataForm;
