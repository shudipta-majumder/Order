import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface Credentials {
  userId: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // @ts-ignore
      async authorize(credentials: Credentials) {
        let data = {
          code: "",
          message: "",
          errors: [],
          data: {},
        };
        const { userId, password } = credentials;
        try {
          const resLogin = await axios.post(
            `${process.env.NEXT_PUBLIC_HOST}/auth/login/`,
            {
              userId,
              password,
            },
            {
              timeout: 4000,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          data = resLogin.data;
        } catch (error) {
          if (error.code === "ECONNABORTED" || error.code === "ECONNREFUSED") {
            data = {
              code: "408",
              message: "failed",
              errors: ["Request Timeout, Network Error."],
              data: null,
            };
          } else {
            data = error.response.data;
          }
        }
        if (data.code == "200") {
          return data;
        } else {
          throw new Error(data.errors[0]);
          // return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};
