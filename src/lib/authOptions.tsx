import { useDb } from "@/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      image: string;
      role: string;
    };
  }

  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
    role: string;
  }
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(useDb()),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = useDb();
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("Invalid credentials. User not found.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password || ""
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials. Please try again.");
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile, user }) {
      const db = useDb();

      if (account?.provider === "google" && profile?.email) {
        try {
          // Check if a user exists with this email
          const existingUser = await db.user.findUnique({
            where: { email: profile.email },
            include: {
              accounts: true,
            },
          });

          if (!existingUser) {
            throw new Error("No user found with this email.");
          }

          // If the user doesn't have this provider account linked, link it
          const hasProvider = existingUser.accounts.some(
            (acc) => acc.provider === account.provider
          );

          if (!hasProvider) {
            await db.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            });
          }

          // Set the user object to match the existing user
          user.id = existingUser.id;
          user.email = existingUser.email;
          (user as any).firstName = existingUser.firstName;
          (user as any).lastName = existingUser.lastName;
          (user as any).role = existingUser.role;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account, trigger }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.image = user.image;
        token.role = (user as any).role;
        return token;
      }

      // Token refresh - get fresh data if needed
      if (trigger === "update" || trigger === "signIn") {
        const db = useDb();
        const freshUser = await db.user.findUnique({
          where: { email: token.email as string },
        });

        if (freshUser) {
          token.id = freshUser.id;
          token.email = freshUser.email;
          token.firstName = freshUser.firstName;
          token.lastName = freshUser.lastName;
          token.image = freshUser.image;
          token.role = freshUser.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Ensure session always reflects current token data
      session.user = {
        id: token.id as string,
        email: token.email as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        image: token.image as string,
        role: token.role as string,
      };

      return session;
    },
  },
  events: {
    async signOut({ session }) {
      // Clear any additional session data if needed
      if (session) {
        (session.user as any) = undefined;
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;