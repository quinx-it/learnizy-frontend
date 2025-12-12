'use client';

import Image from 'next/image';

import DashboardLink from '@/components/DashBoardLink';
import { routes } from '@/const';
import { useTranslation } from '@/hooks';

import {
  AvatarContainer,
  EditButton,
  ExitIconWrapper,
  LinksContainer,
  LogoutButton,
  NameText,
  ProfileContainer,
  StyledCardWrapper,
  StyledImage,
} from './styles';

import type { FC } from 'react';

const ProfileDashboard: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledCardWrapper>
      <ProfileContainer>
        <AvatarContainer>
          <StyledImage
            src="/images/astronaut1.webp"
            alt={t('PROFILE.ALT_IMAGE')}
            width={152}
            height={152}
          />
          <EditButton type="button">
            <Image src="/images/edit-photo-icon.svg" alt="Edit photo icon" width={27} height={27} />
          </EditButton>
        </AvatarContainer>

        <NameText variant="m-bold">{t('PROFILE.NAME')}</NameText>
      </ProfileContainer>
      <LinksContainer>
        <DashboardLink href={routes.user.userProfilePersonalData} src="/images/person-icon.svg">
          {t('PROFILE.PERSONAL_DATA')}
        </DashboardLink>
        <DashboardLink href={routes.user.userProfileSecuritySettings} src="/images/lock-icon.svg">
          {t('PROFILE.SECURITY_SETTINGS')}
        </DashboardLink>
        <LogoutButton variant="white">
          <ExitIconWrapper>
            <Image src="/images/exit-icon.svg" alt="Exit icon" width={16} height={16} />
          </ExitIconWrapper>
          {t('PROFILE.LOGOUT')}
        </LogoutButton>
      </LinksContainer>
    </StyledCardWrapper>
  );
};

export default ProfileDashboard;
