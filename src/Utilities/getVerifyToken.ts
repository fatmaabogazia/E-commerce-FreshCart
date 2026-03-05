"use server"

import axios from "axios"
import { getMyToken } from "./getMyToken"

export async function getVerifyTokenFun() {
    try {
        const token = await getMyToken()
        if (!token) throw new Error("No Token")

        const data = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
            headers: {
                token
            }
        })
        return data
        
    } catch (error) {
        console.log(error);
    }

}