
import z from "zod"

export const changePasswordSchema = z.object({
    currentPassword: z.string().nonempty("Must Enter Your Old Password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/, "Should Contain Special and Capital Characters").min(6, "at least 6 characters"),
    password: z.string().nonempty("Must Enter Your New Password").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/, "Should Contain Special and Capital Characters").min(6, "at least 6 characters"),
    rePassword:z.string().nonempty("Must Enter Re-Password")
}).refine((obj)=>{
    return obj.password === obj.rePassword
},{
    error:"Re-Password Must Match With Password",
    path:["rePassword"]
})

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>