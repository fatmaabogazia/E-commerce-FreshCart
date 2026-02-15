"use server"
// علشان هي فنكشن ف احنا بنحدد وكمان علشان ميبقاش كل حاجه علي البراوزر وتكون علي السيرفر ومخفيه

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {

    //  in local
    const decodeToken = (await cookies()).get("next-auth.session-token")?.value ||
        // in production
        (await cookies()).get("__Secure-next-auth.session-token")?.value

    // لو مش عرف يجيبه خالص  ==> not return any thing
    if (!decodeToken) return null

    // علامه التعجب معناها ان متاكده ان في متغير اسمه كداا علشان هو بيبقي زعلان هل هو هيلاقي المتغير داا ولا لقه 
    const token = await decode({ token: decodeToken, secret: process.env.AUTH_SECRET! })

    return token?.token
}