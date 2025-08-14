import { NextRequest, NextResponse } from 'next/server';
import { decodeToken } from '@shared/lib/utils';
import { defaultPage, loginPageUrl, publicRoutes, roleRoutes } from './shared/constants/routes';
import { UserRole, DecodedToken } from './store/slices/auth/types';


export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken && !publicRoutes.includes(pathname)) {
    return redirectTo(loginPageUrl, req);
  }

  if (refreshToken) {
    try {
      const { user }: DecodedToken = decodeToken(refreshToken);
      const role = user?.role ?? UserRole.GUEST;

      if (pathname === loginPageUrl) {
        return redirectTo(defaultPage[role], req);
      }

      const allowedRoutes = roleRoutes[role];
      const hasAccess = allowedRoutes.some((route) => {
        if (route === '/') return pathname === '/';
        return pathname.startsWith(route);
      });

      if (!hasAccess) {
        return redirectTo(defaultPage[role], req);
      }
    } catch (error) {
      console.error('Invalid token', error);
      return redirectTo(loginPageUrl, req);
    }
  }

  return NextResponse.next();
}

function redirectTo(path: string, req: NextRequest) {
  return NextResponse.redirect(new URL(path, req.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|_next/|images/|favicon.ico|login|$).*)'],
};
