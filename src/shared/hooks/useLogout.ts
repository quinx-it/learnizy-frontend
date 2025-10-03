import { useAppDispatch } from '@/shared/hooks/redux';
import { logout } from '@/store/slices/auth/slice';
import { useLogoutMutation } from '@/api/endpoints/auth/auth';
import { showToast } from '@/shared/ui/toaster';

export const useLogout = () => {
  const [logoutApi, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logoutApi({}).unwrap();
      dispatch(logout());
    } catch (err) {
      showToast('error', 'Ошибка', 'Что-то пошло не так, попробуйте снова 😭');
    }
  };

  return { handleLogout, isLoading };
};
