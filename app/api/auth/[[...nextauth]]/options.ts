import dbConnector from "@/lib/db/connector";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { SQLiteAdapter } from "@next-auth/sqlite-adapter";
import GoogleProvider from "next-auth/providers/google";

interface IProfile {
  given_name: string;
  family_name: string;
}

export const authConfigOptions = {
  // adapter: SQLiteAdapter(dbConnector),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await dbConnector();
        const user = await db.get(
          "SELECT * FROM users WHERE username = ? AND password = ?",
          credentials?.username,
          credentials?.password
        );

        console.log(user)

        // if (user) {
        //   return { id: user.id, name: user.username };
        // }

        return null;
      },
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
