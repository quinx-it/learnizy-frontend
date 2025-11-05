import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatchType, RootStateType } from '@/store';

export const useAppDispatch: () => AppDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
