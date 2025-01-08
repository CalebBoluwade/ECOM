import dbConnector from "@/lib/db/connector";
import clientPromise from "@/lib/db/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface IProfile {
  given_name: string;
  family_name: string;
}

export const authConfigOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/auth/login",
    signOut: "/auth",
    signIn: "/auth",
  },
  session: {
    strategy: "jwt", // or "database" if you want sessions stored in MongoDB
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, profile, user }) {
      if (profile) {
        token.isAdmin = (user as any).isAdmin || false;
        token.firstName = (profile as IProfile).given_name ??= "";
        token.lastName = (profile as IProfile).family_name ??= "";
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
  // theme: {},
  // useSecureCookies: true
} satisfies NextAuthOptions;

export const auth = NextAuth(authConfigOptions);

// export { authOptions as GET, authOptions as POST };
