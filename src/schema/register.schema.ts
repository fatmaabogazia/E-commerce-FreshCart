
import * as z from 'zod'

export const registerSchema = z.object({
    name: z.string().nonempty("This Field Required").min(2, "Enter At Least 2 Characters").max(15, "Max Characters is 15"),
    email: z.string().nonempty("This Field Required").regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "In Valid Mail"),
    password: z.string().nonempty("This Field Required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/, "Should Contain Special and Capital Characters").min(6, "at least 6 characters"),
    rePassword: z.string().nonempty("This Field Required"),
    phone: z.string().nonempty("This Field Required").regex(/^01[0125][0-9]{8}$/, "Should Egyption Number")
}).refine((obj) => {
    return obj.password === obj.rePassword
}, {
    error: "RePassword must Match with Password",
    path: ["rePassword"]
})

//  zod make my type inteface 
export type registerSchemaType = z.infer<typeof registerSchema>
