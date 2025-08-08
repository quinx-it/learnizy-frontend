'use client';

import React from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { PasswordInput } from '@/shared/ui/passwordInput';

export const SecuritySettingsForm = () => {
  return (
    <form>
      <div className="grid grid-cols-2 grid-rows-[repeat(3,1fr)_auto] gap-x-4 gap-y-8">
        <PasswordInput label="Пароль" className="col-span-2" />
        <PasswordInput label="Новый пароль" className="col-span-2" />
        <Input label="Логин (Email или телефон)" className="col-span-2" />
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
