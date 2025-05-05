import { NextRequest, NextResponse } from 'next/server';
import process from 'process';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const url = request.nextUrl;

  const searchParams = url.searchParams;
  const locale = searchParams.get('locale') || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  if(locale){
    requestHeaders.set('locale', locale);
  }
  // const roleCookie = request.cookies.get('user-role')?.value;
  // console.log("url.pathname", url.pathname);
  // // if (!roleCookie && url.pathname !== '/') {
  // if (false && url.pathname !== '/') {
  //   console.log(url.pathname);
    
  //   return NextResponse.redirect(new URL('/', request.url)); // redirect về trang login "/"
  // }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
export const config = {
  matcher: [
    '/((?!api|_next|images|favicon.ico|robots.txt).*)',
  ],
}

