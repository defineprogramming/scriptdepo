import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase } from '../../../utils/db'
import User from '../../../models/User'

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { db } = await connectToDatabase()
        const user = await db.collection('users').findOne({ username: credentials.username })

        if (!user) {
          throw new Error('No user found')
        }

        if (credentials.password !== user.password) {
          throw new Error('Password does not match')
        }

        return { id: user._id, name: user.name, email: user.email, image: user.image, role: user.role }
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session(session, token) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    }
  }
})