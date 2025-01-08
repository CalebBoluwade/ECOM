import { type DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";

// Extend the JWT type to include the required properties
declare module "next-auth/jwt" {
  interface JWT {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    picture: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: { firstName: string; lastName: string; isAdmin: boolean; picture: string;} & DefaultSession["user"];
  }

  export interface User extends DefaultUser {
    user: { firstName: string; lastName: string }
  }
}
