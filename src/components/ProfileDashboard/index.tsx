'use client';

import { FC } from 'react';

import DashboardLink from '@/components/DashBoardLink';
import { EditPhotoIcon, ExitIcon, LockIcon, PersonIcon } from '@/components/Icons';
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

const ProfileDashboard: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledCardWrapper>
      <ProfileContainer>
        <AvatarContainer>
          <StyledImage src="/images/astronaut1.webp" alt="Profile Image" width={152} height={152} />
          <EditButton type="button">
            <EditPhotoIcon />
          </EditButton>
        </AvatarContainer>

        <NameText variant="m-bold">{t('PROFILE.NAME')}</NameText>
      </ProfileContainer>
      <LinksContainer>
        <DashboardLink href={routes.user.userProfilePersonalData} Icon={PersonIcon}>
          {t('PROFILE.PERSONAL_DATA')}
        </DashboardLink>
        <DashboardLink href={routes.user.userProfileSecuritySettings} Icon={LockIcon}>
          {t('PROFILE.SECURITY_SETTINGS')}
        </DashboardLink>
        <LogoutButton variant="white">
          <ExitIconWrapper>
            <ExitIcon />
          </ExitIconWrapper>
          {t('PROFILE.LOGOUT')}
        </LogoutButton>
      </LinksContainer>
    </StyledCardWrapper>
  );
};

export default ProfileDashboard;
