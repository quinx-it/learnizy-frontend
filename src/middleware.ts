import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes } from './shared/constants/routes';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = publicRoutes.find((path) => pathname === path);

  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken && !isPublic) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico$|login$|$).*)'],
};
