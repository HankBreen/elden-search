/*
  Authorization file. Handles receiving an email address and password and
  checking if the user is logged into the database. If they are, it returns
  the users id and email, if not, null.

*/


import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import { createClient } from '@/app/utils/supabase/server'
import bcrypt from 'bcrypt'
 
type User = {
    id: string,
    created_at: string,
    email: string,
    password: string
}

// get user object based on given email
async function getUser(email: string): Promise<User | null> {
    const supabase = await createClient()

    const {data, error} = await supabase
        .from('users')
        .select('id, created_at, email, password')
        .eq('email', email)
        .maybeSingle();
    
    if (error) {
        console.error("Error finding user", error)
        return null
    }

    return (data as User | null) ?? null;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if (!parsedCredentials.success) return null;
      
        const {email, password } = parsedCredentials.data

        const user = await getUser(email)
        if (!user) return null

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        // finally return the user
        return {
          id: user.id,
          email: user.email
        }

      },
    }),
  ],
});