import { NAVIGATE_URL } from '@src/types/enum';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const isAuthenticated = request.cookies.get('token')?.value;

  // 로그인 여부를 체크
  if (isAuthenticated && isAuthenticated !== 'expired') {
    if (pathName === NAVIGATE_URL.LOGIN || pathName === '/') {
      return NextResponse.redirect(new URL(NAVIGATE_URL.ACCOUNT, request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (pathName !== NAVIGATE_URL.LOGIN) {
    return NextResponse.redirect(new URL(NAVIGATE_URL.LOGIN, request.url));
  }

  return NextResponse.next();
};
export const config = {
  matcher: ['/((?!api|server|_next/static|favicon.ico|mockServiceWorker).*)'],
};
