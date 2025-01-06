import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { ADMIN_ROUTES, LOGIN,SIGNUP, PUBLIC_ROUTES, ROOT, FORGET_PASSWORD, PRODUCT_DETAILS } from './lib/routes';

export async function middleware(req: any) {
 
  const token = await getToken({ req, secret: process.env.AUTH_SECRET }) as any;
  const {nextUrl} = req;

  console.log("req ",req);
  console.log("middleware token",token);
  

  const isAdminRoute = (ADMIN_ROUTES.find(route => nextUrl.pathname.startsWith(route)));
  const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))) || nextUrl.pathname === ROOT;
  // const isPublicRoute = PUBLIC_ROUTES.some(route => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT;


  // console.log("nextUrl pathname",nextUrl.pathname);
  // console.log("isAdminRoute",isAdminRoute);
  // console.log("admin role ",token?.role);


  // admin access
  if(isAdminRoute && token?.user?.role !== 'admin'){ 
    return NextResponse.redirect(new URL('/not-found',nextUrl)); // Unauthorized page
  }

  // can't access signup  ,login and forgot-pass page when authenticate
  if(token && (nextUrl.pathname.startsWith(LOGIN) || nextUrl.pathname.startsWith(SIGNUP) || nextUrl.pathname.startsWith(FORGET_PASSWORD))){ 
    return NextResponse.redirect(new URL(ROOT,nextUrl)); // Unauthorized page
  }
  // public access
  if(!token && !isPublicRoute && !nextUrl.pathname.startsWith(PRODUCT_DETAILS) ){ 
    return Response.redirect(new URL(LOGIN,nextUrl))
  }
 
  // all authorize route 
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
 };