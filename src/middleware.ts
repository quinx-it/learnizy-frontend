import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes, routes } from './shared/constants/routes';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const isPublic = publicRoutes.find((path) => pathname === path);

    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (refreshToken && pathname === routes.loginPage) {
        const homeUrl = new URL(routes.homePage, req.url);
        return NextResponse.redirect(homeUrl);
    }

    if (!refreshToken && !isPublic) {
        const loginUrl = new URL(routes.loginPage, req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico$|login$|$).*)'],
};
