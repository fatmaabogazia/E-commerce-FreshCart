import { changePasswordSchemaType } from "@/schema/changePassword.schema";
import { getMyToken } from "@/Utilities/getMyToken";
import axios from "axios";

export async function changePasswordApiFun(values : changePasswordSchemaType) {

    const token = await getMyToken()

    if (!token) throw new Error("Must Logged first")

    const res = await axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", values, {
        headers: {
            token
        }
    })

    return res
}