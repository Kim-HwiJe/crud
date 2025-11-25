import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import connectMongoDB from '@/libs/mongodb'
import User from '@/models/user'
import Log from '@/models/log'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          const apiUrl = process.env.API_URL || ''

          // 기존 방식 API 호출
          const res = await fetch(`${apiUrl}/api/user-auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, account }),
          })

          if (res.ok) return true

          // --- 내부 처리 방안도 fallback으로 유지 ---
          await connectMongoDB()

          const { name, email } = user

          const userExists = await User.findOne({ email })

          if (!userExists) {
            await User.create({ name, email })
          }

          await Log.create({ email })

          return true
        } catch (error) {
          console.log(error)
          return false
        }
      }
      return true
    },
  },
})
