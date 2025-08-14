import { NextRequest, NextResponse } from 'next/server'
import { decodeToken } from '@shared/lib/utils'
import { mentorRoutes, publicRoutes, routes, userRoutes } from './shared/constants/routes'
import { UserRole, DecodedToken } from './store/slices/auth/types'

const loginPageUrl = routes.public.loginPage

const roleRoutes: Record<UserRole, string[]> = {
    [UserRole.GUEST]: publicRoutes,
    [UserRole.USER]: userRoutes,
    [UserRole.MENTOR]: mentorRoutes,
}

const defaultPage: Record<UserRole, string> = {
    [UserRole.GUEST]: routes.public.loginPage,
    [UserRole.USER]: routes.user.homePage,
    [UserRole.MENTOR]: routes.mentor.students,
}

export function middleware(req: NextRequest) {
    console.log('f')
    const { pathname } = req.nextUrl
    const refreshToken = req.cookies.get('refreshToken')?.value

    if (!refreshToken && !publicRoutes.includes(pathname)) {
        return redirectTo(loginPageUrl, req)
    }

    if (refreshToken) {
        try {
            const { user }: DecodedToken = decodeToken(refreshToken);
            const role = user?.role ?? UserRole.GUEST

            if (pathname === loginPageUrl) {
                return redirectTo(
                    defaultPage[role],
                    req
                )
            }

            const allowedRoutes = roleRoutes[role]
            const hasAccess = allowedRoutes.some(route => {
                if (route === '/') return pathname === '/'
                return pathname.startsWith(route)
            })

            if (!hasAccess) {
                return redirectTo(
                    defaultPage[role],
                    req
                )
            }
        } catch (error) {
            console.error('Invalid token', error)
            return redirectTo(loginPageUrl, req)
        }
    }

    return NextResponse.next()
}

function redirectTo(path: string, req: NextRequest) {
    return NextResponse.redirect(new URL(path, req.url))
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|_next/|favicon.ico|login|$).*)'],
}