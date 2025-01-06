import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      full_name: string;
      provider: string;
      profilePicture: string;
      role?: 'admin' | 'seller' | 'customer';
      phone?: string | null;
      email?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    phone?: string | null;
    customData?: {
      id: string;
      full_name: string;
      provider: string;
      profilePicture: string;
      role?: 'admin' | 'seller' | 'customer';
      phone?: string | null;
      email?: string | null;
    };
  }
}
