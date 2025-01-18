

export const LOGIN = "/login"
export const FORGET_PASSWORD = "/forgot-pass"
export const PRODUCT_DETAILS = "/product-detail/"
export const SIGNUP = "/signup"
export const ROOT = "/" 

export const PUBLIC_ROUTES = [
  '/login',
  '/search',
  '/signup',
  '/forgot-pass',
  '/not-found',
  '/api/auth/',
  '/api/otp-send',
  '/api/category-api',
 
  // admin access

  '/api/drop-shop-api'
//  '/auth/callback', // when login with any provider auto redirect to that api and handle cookies
]

export const ADMIN_ROUTES = [
  '/dashboard',
 
]

