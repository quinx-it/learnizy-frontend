'use client';

import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radioGroup';
import { Input } from '@/shared/ui/input';
import { DatePicker } from '@/shared/ui/datePicker';
import { Button } from '@/shared/ui/button';

export const PersonalDataForm = () => {
  return (
    <form>
      <RadioGroup defaultValue="man" className="mb-8">
        <RadioGroupItem value="man">Мужчина</RadioGroupItem>
        <RadioGroupItem value="woman">Женщина</RadioGroupItem>
      </RadioGroup>
      <div className="grid-rows-[repeat(5,1fr)_auto] grid grid-cols-2 gap-x-4 gap-y-8">
        <Input label="Имя" />
        <Input label="Фамилия" />
        <Input label="Email" className="col-span-2" />
        <Input label="Адрес" className="col-span-2" />
        <Input label="Номер" />
        <DatePicker label="Дата рождения" />
        <Input label="Страна" />
        <Input label="Город" />
        <Button type="reset" variant="white" className="flex-1">
          Не сохранять
        </Button>
        <Button type="submit" variant="blue" className="flex-1">
          Сохранить изменения
        </Button>
      </div>
    </form>
  );
};
