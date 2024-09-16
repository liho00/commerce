// middleware.ts
export { auth as middleware } from "auth";
// import { authorizeFn, getOrigin, isLoggedIn, logoutFn } from 'lib/shopify/customer';
// import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   /****
//   Authorize Middleware to get access tokens
//   *****/
//   if (request.nextUrl.pathname.startsWith('/authorize')) {
//     console.log('Running Initial Authorization Middleware');
//     const origin = getOrigin(request);
//     //console.log ("origin", origin)
//     return await authorizeFn(request, origin);
//   }
//   /****
//   END OF Authorize Middleware to get access tokens
//   *****/

//   /****
//   LOGOUT -
//   *****/
//   if (request.nextUrl.pathname.startsWith('/logout')) {
//     console.log('Running Logout middleware');
//     const origin = getOrigin(request);
//     return await logoutFn(request, origin);
//   }
//   /****
//   END OF LOGOUT
//   *****/
//   /****
//   Account
//   *****/

//   if (request.nextUrl.pathname.startsWith('/account')) {
//     console.log('Running Account middleware');
//     //const newHeaders = new Headers(request.headers)
//     const origin = getOrigin(request);
//     //console.log ("origin", origin)
//     return await isLoggedIn(request, origin);
//   }

//   /****
//   END OF Account
//   *****/
// }

// export const config = {
//   matcher: ['/authorize', '/logout', '/account']
// };