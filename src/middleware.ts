import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { ADMIN_ROUTES, LOGIN,SIGNUP, PUBLIC_ROUTES, ROOT, FORGET_PASSWORD, PRODUCT_DETAILS } from './lib/routes';

export async function middleware(req: any) {
 

  const {nextUrl} = req;
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  }) as any;

  // console.log('Middleware Cookies:', req.cookies);
  // console.log('Middleware Token:', token);
  

  const isAdminRoute = (ADMIN_ROUTES.find(route => nextUrl.pathname.startsWith(route))) || false;
  // const isAdminAccessApi = (ADMIN_ACCESS_API.find(route => nextUrl.pathname.startsWith(route))) || false;
  const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))) || nextUrl.pathname === ROOT;
  // const isPublicRoute = PUBLIC_ROUTES.some(route => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT;


  console.log("nextUrl pathname",nextUrl.pathname);
  // console.log("isPublicRoute",isPublicRoute);
  // console.log("isAdminRoute",isAdminRoute);
  // console.log("isAdminAccessApi",isAdminAccessApi);
  // console.log("admin role ",token?.user?.role);

  // if(isAdminAccessApi && token?.user?.role === 'admin'){ 
  //   return NextResponse.next();
  // }
  
  // admin access
  if(isAdminRoute && token?.user?.role !== 'admin'){ 
    // console.log("1------------");
    return NextResponse.redirect(new URL('/not-found',nextUrl)); // Unauthorized page
  }

  // can't access signup  ,login and forgot-pass page when authenticate
  if(token && (nextUrl.pathname.startsWith(LOGIN) || nextUrl.pathname.startsWith(SIGNUP) || nextUrl.pathname.startsWith(FORGET_PASSWORD))){ 
    // console.log("2------------");
    return NextResponse.redirect(new URL(ROOT,nextUrl)); // Unauthorized page
  }

  // public access
  if(!token && !isPublicRoute  && !nextUrl.pathname.startsWith(PRODUCT_DETAILS) ){ 
    // console.log("3--------------");
    
    return Response.redirect(new URL(LOGIN,nextUrl))
  }
  // console.log("==============");
 
  // all authorize route 
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
 };