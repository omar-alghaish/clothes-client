import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// Define the options for NextAuth
const options: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '' as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '' as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || '' as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '' as string,
        }),
    ],
    secret: process.env.SECRET || '',
};

// Create the NextAuth handler
const authHandler= NextAuth(options)

export { authHandler as GET, authHandler as POST }
