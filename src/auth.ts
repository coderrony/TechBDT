import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectDB } from './services/mongo';
import { User } from './model/user-model';
import { getUserByEmail, newUserCreate } from './queries/users';
import { UserType } from './types/UserType';
import { replaceMongoIdInObject } from './lib/convertData';


// import { AdapterUser } from "next-auth/adapters";
import { Session as NextAuthSession } from 'next-auth';
import { authConfig } from './auth.config';

type Session = NextAuthSession & {
  user?: {
    id: string;
    full_name: string;
    provider: string;
    profilePicture: string;
    role?: 'admin' | 'seller' | 'customer';
    phone?: string | null;
    email?: string | null;
  };
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
 ...authConfig,
  providers: [
    Google,
    Facebook,

    Credentials({
      authorize: async credentials => {
        try {
          await connectDB();
          console.log('Credentials:', credentials);

          if (!credentials) {
            return null;
          }

          const { csrfToken, isLogin, redirect, callbackUrl, ...rest } =
            credentials;

          if (isLogin === 'true') {
            // Explicitly define the type of `user`
            const user = (await User.findOne({
              phone: credentials.phone,
            }).lean()) as UserType | null;

            if (!user) {
              throw new Error('User not found.');
            }

            if (
              typeof credentials?.password !== 'string' ||
              typeof user?.password !== 'string'
            ) {
              throw new Error('Invalid password format.');
            }

            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password,
            );
            if (!isMatch) {
              throw new Error('Incorrect password.');
            }

            return replaceMongoIdInObject(user as any);
          } else {
            // console.log("rest ",rest);

            return rest;
          }
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authorization failed.');
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        // console.log("signIn user ",user);
        // console.log("signIn account ",account);

        let userData;
        if (
          account!.provider === 'google' ||
          account!.provider === 'facebook'
        ) {
          await connectDB();
          const existingUser = await getUserByEmail(user?.email as string);
          // console.log('existingUser ', existingUser);

          if (!existingUser) {
            // new user create
            userData = await newUserCreate({
              full_name: user.name,
              provider: account!.provider,
              email: user.email,
              profilePicture: user.image,
            } as UserType);
          } else {
            userData = existingUser;
          }
          // console.log("userData ",userData);

          user.customData = userData;
        } else {
          const { id, full_name, provider, profilePicture, role } =
            user as UserType;
          const data = {
            id,
            full_name,
            provider,
            profilePicture,
            role,
          } as UserType;

          if (user?.phone) {
            data['phone'] = user.phone;
          }
          if (user?.email) {
            data['email'] = user.email;
          }
          user.customData = data;
        }
        return true;
      } catch (error) {
        return false;
      }
    },

    async jwt({ token, user }) {
      //  console.log("jwt token ",token);
      //  console.log("jwt user ",user);

      if (user?.customData) {
        token.user = user.customData;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: any }) {
      // console.log("session session ", session);
      // console.log("session token ", token);

      if (token?.user) {
        session.user = token.user as Session['user'];
      }

      return session;
    },
  },
});
