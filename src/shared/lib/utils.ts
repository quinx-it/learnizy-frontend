import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getOrderClass = (index: number) => {
    if (index === 2) return 'min-[640px]:max-xl:order-4';
    if (index === 3) return 'min-[640px]:max-xl:order-3';
    return `${index + 1}`;
};



import { jwtDecode } from 'jwt-decode'
import { DecodedToken, UserRole } from '@/store/slices/auth/types';
import { dynamicMentorRoutes, dynamicUserRoutes, publicRoutes, staticMentorRoutes, staticUserRoutes } from '../constants/routes';

interface DecodedTokenPayload {
    role: UserRole
    sub: string
}

export const decodeToken = (token: string): DecodedToken => {
    const data = jwtDecode<DecodedTokenPayload>(token)
    return { user: { userName: data.sub, role: data.role } }
}

export const isMentor = (role: UserRole) => {
    return role === UserRole.MENTOR
}
export const isUser = (role: UserRole) => {
    return role === UserRole.USER
}
export const isGuest = (role: UserRole) => {
    return role === UserRole.GUEST
}

export function isMentorRoute(pathname: string) {
    return (
        staticMentorRoutes.includes(pathname) ||
        dynamicMentorRoutes.some(rx => rx.test(pathname))
    )
}

export function isUserRoute(pathname: string) {
    return (
        staticUserRoutes.includes(pathname) ||
        dynamicUserRoutes.some(rx => rx.test(pathname))
    )
}

export function isPublicRoute(pathname: string) {
    return (
        publicRoutes.includes(pathname)
    )
}

export function isRoleRoute(role: UserRole, pathname: string) {
    switch(role){
        case UserRole.GUEST:
            return isPublicRoute(pathname)
        case UserRole.USER:
            return isUserRoute(pathname)
        case UserRole.MENTOR:
            return isMentorRoute(pathname)
    }
}
