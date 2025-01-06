// 'use server';

// import { signIn } from '@/auth';

// export const credentialLogin = async (email: string, password: string) => {
//   try {
//     const res = await signIn('credentials', {
//       email,
//       password,
//       redirect: false,
//     });
//     return res;
//   } catch (err : any) {
//     throw new Error(err);
//   }
// };

// export const doSocialLogin = async (formData:FormData)=>{
//   const action = formData.get("action");
//   console.log("action ",action);
  
//   // await signIn(action as string,{ redirectTo: "/courses"})
  
// }