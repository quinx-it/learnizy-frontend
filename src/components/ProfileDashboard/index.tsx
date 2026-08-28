'use client';

import Image from 'next/image';
import { useRef, type ChangeEvent, type FC } from 'react';

import {
  getFileDownloadUrl,
  getObjectKeyFromDownloadUrl,
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useUploadFileMutation,
} from '@/api/endpoints/user';
import DashboardLink from '@/components/DashBoardLink';
import { showToast } from '@/components/Toaster';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';
import { useLogout } from '@/hooks/useLogout';

import {
  AvatarContainer,
  EditButton,
  ExitIconWrapper,
  HiddenFileInput,
  LinksContainer,
  LogoutButton,
  NameText,
  ProfileContainer,
  StyledCardWrapper,
  StyledImage,
} from './styles';

const ProfileDashboard: FC = () => {
  const { t } = useTranslation();
  const { handleLogout } = useLogout();

  const { data: user } = useGetCurrentUserQuery();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [updateCurrentUser] = useUpdateCurrentUserMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

  const avatarSrc = user?.avatarKey
    ? getFileDownloadUrl(user.avatarKey)
    : '/images/astronaut1.webp';

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (!file) return;

    try {
      const uploaded = await uploadFile(file).unwrap();
      const avatarKey = getObjectKeyFromDownloadUrl(uploaded.downloadUrl);

      if (!avatarKey) throw new Error('missing object key');

      await updateCurrentUser({ avatarKey }).unwrap();

      showToast('success', t('PROFILE.AVATAR_UPDATED'), '');
    } catch {
      showToast('error', t('PROFILE.AVATAR_ERROR'), '');
    }
  };

  return (
    <StyledCardWrapper>
      <ProfileContainer>
        <AvatarContainer>
          <StyledImage src={avatarSrc} alt={t('PROFILE.ALT_IMAGE')} width={152} height={152} />
          <EditButton
            type="button"
            disabled={isUploading}
            aria-label={t('PROFILE.ALT_IMAGE')}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image src="/images/edit-photo-icon.svg" alt="" width={27} height={27} />
          </EditButton>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </AvatarContainer>

        <NameText variant="m-bold">{fullName || t('PROFILE.NAME')}</NameText>
      </ProfileContainer>
      <LinksContainer>
        <DashboardLink href={ROUTES.USER_PROFILE_PERSONAL_DATA} src="/images/person-icon.svg">
          {t('PROFILE.PERSONAL_DATA')}
        </DashboardLink>
        <DashboardLink href={ROUTES.USER_PROFILE_SECURITY_SETTINGS} src="/images/lock-icon.svg">
          {t('PROFILE.SECURITY_SETTINGS')}
        </DashboardLink>
        <LogoutButton variant="white" onClick={handleLogout}>
          <ExitIconWrapper>
            <Image src="/images/exit-icon.svg" alt="" width={16} height={16} />
          </ExitIconWrapper>
          {t('PROFILE.LOGOUT')}
        </LogoutButton>
      </LinksContainer>
    </StyledCardWrapper>
  );
};

export default ProfileDashboard;
