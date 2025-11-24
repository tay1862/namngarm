import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from './prisma';
import { rateLimit, getClientIP, SECURITY_CONFIG } from './security';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req: any) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('[AUTH] Missing credentials');
            return null;
          }

          // Rate limiting for login attempts (non-blocking)
          try {
            const clientIP = getClientIP(req);
            const rateLimitResult = await rateLimit(`login:${clientIP}`, SECURITY_CONFIG.LOGIN_RATE_LIMIT_MAX);

            if (!rateLimitResult.success) {
              console.log('[AUTH] Rate limit exceeded for IP:', clientIP);
              return null;
            }
          } catch (error) {
            console.log('[AUTH] Rate limiting error (continuing):', error);
            // Continue with authentication if rate limiting fails
          }

          // Sanitize input
          const email = credentials.email.toLowerCase().trim();
          const password = credentials.password;

          console.log('[AUTH] Attempting login for:', email);

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            console.log('[AUTH] User not found:', email);
            return null;
          }

          if (!user.isActive) {
            console.log('[AUTH] User inactive:', email);
            return null;
          }

          const isPasswordValid = await compare(password, user.password);

          if (!isPasswordValid) {
            console.log('[AUTH] Invalid password for:', email);
            return null;
          }

          console.log('[AUTH] Login successful for:', email);

          // Update last login time
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('[AUTH] Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: SECURITY_CONFIG.SESSION_MAX_AGE,
    updateAge: SECURITY_CONFIG.SESSION_UPDATE_AGE,
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  // @ts-ignore
  secret: process.env.NEXTAUTH_SECRET,
};
