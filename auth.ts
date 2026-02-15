import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { jwtDecode } from "jwt-decode";


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            // لازم لازم تعمل ريترن لاي حاجه 
            authorize: async (Credentials) => {
                // call Api Sign in 
                // `${process.env.API}auth/signin`
                const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: "POST",
                    body: JSON.stringify({
                        email: Credentials?.email,
                        password: Credentials?.password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const payload = await response.json()

                if (payload.message === "success") {
                    // authorize ==> when return object authorize ==> need id ==> get from token
                    // library ==> npm i jwt-decode ==> for decode token
                    const decode: { id: string } = jwtDecode(payload.token);

                    console.log(decode);
                    return {
                        id: decode.id,
                        user: payload.user,
                        token: payload.token
                    }

                } else {
                    throw new Error("invalid password or email")
                }

                // return null // دا يعني مهما كل حاجه صح برضو ترجع غلط وان الساين ان محصلش وكدااا
                // return payload.user
                // throw new Error(payload.error ||"in valid password or email" )

            }
        })
    ],
    callbacks: {
        // user ==> دي المعلومات اللي جايلها من return => authorize
        // دي داله بتخليني اشوف الحاجات دي علي السيرفر فقط مش علي البراوزر
        // وبتشفر التوكين مره كمان علشان مفيش حد يعرف يفكه خالص
        async jwt({ token, user }) {
            //  user and token ==> دي الاسماء اللي انا كتباها في الاوبجكت فوق 
            if (user) {
                token.user = user.user
                token.token = user.token
            }

            return token  // encrypted object ==> {user:{ email , name , role} , token}
        },
        // دي اقدر اشوفهاا علي البراوزر والسيرفر كماان
        // دي هيجيلهاا التوكين اللي فوق 
        async session({ session, token }) {
            session.user = token.user

            return session
        },
    }

}


// احنا ممكن نعمل API لنفسنا عن طريق Route Handler
// Route Handler ==> make for me end point
//  in src ==> app ==> make folder (api) ==> make folder any name (is end point) ==> file should called (route) 