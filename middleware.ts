import { NAVIGATE_URL } from '@src/types/enum';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const isAuthenticated = !!request.cookies.get('token');

  // 로그인 여부를 체크
  if (isAuthenticated) {
    if (pathName === '/login') {
      return NextResponse.redirect(new URL(NAVIGATE_URL.MAIN, request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (pathName !== '/login') {
    return NextResponse.redirect(new URL(NAVIGATE_URL.LOGIN, request.url));
  }

  return NextResponse.next();
};
export const config = {
  matcher: ['/((?!api|server|_next/static|favicon.ico|mockServiceWorker).*)'],
};
