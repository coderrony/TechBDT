
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { ADMIN_ROUTES, FORGET_PASSWORD, LOGIN, PRODUCT_DETAILS, PUBLIC_ROUTES, ROOT, SIGNUP } from './lib/routes';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export const { auth } = NextAuth(authConfig)

export default auth(async (req)=>{ 
  const {nextUrl} = req;
  const isAuthenticated = req.auth;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET }) as any;
  console.log("req ",req);
  console.log("token ",token);
  
  console.log("nextUrl pathname",nextUrl.pathname);
  console.log("isAuthenticated ",isAuthenticated);
  
  const isAdminRoute = (ADMIN_ROUTES.find(route => nextUrl.pathname.startsWith(route)));
  const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))) || nextUrl.pathname === ROOT;
  // const isPublicRoute = PUBLIC_ROUTES.some(route => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT;

  console.log("middleware isAuthenticated",isAuthenticated);
  console.log("nextUrl pathname",nextUrl.pathname);
  // console.log("isAdminRoute",isAdminRoute);
  // console.log("admin role ",token?.role);


  // admin access
  if(isAdminRoute && isAuthenticated?.user?.role !== 'admin'){ 
    return NextResponse.redirect(new URL('/not-found',nextUrl)); // Unauthorized page
  }

  // can't access signup  ,login and forgot-pass page when authenticate
  // if(isAuthenticated && (nextUrl.pathname.startsWith(LOGIN) || nextUrl.pathname.startsWith(SIGNUP) || nextUrl.pathname.startsWith(FORGET_PASSWORD))){ 
  //   return NextResponse.redirect(new URL(ROOT,nextUrl)); // Unauthorized page
  // }
  // public access
  if(!isAuthenticated && !isPublicRoute && !nextUrl.pathname.startsWith(PRODUCT_DETAILS) ){ 
    return Response.redirect(new URL(LOGIN,nextUrl))
  }
 
  // all authorize route 
  return NextResponse.next();
})


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/api/auth/(.*)"],
};


// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
//  };