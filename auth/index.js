// app/api/auth/[...nextauth]/route.ts
import Shopify from "auth/providers/shopify";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Shopify({
            shopId: process.env.AUTH_SHOPIFY_SHOP_ID,
            clientId: process.env.AUTH_SHOPIFY_CLIENT_ID,
            clientSecret: process.env.AUTH_SHOPIFY_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token, user, }) {
            return { ...session, token: token }
        },
        async jwt({ token, user, account, profile, }) {
            if (account) {
                // set access_token to the token payload
                const { id_token, ...data } = account;
                token = {
                    ...token,
                    ...data,
                }
            }
            return token;
        },
    },
});


