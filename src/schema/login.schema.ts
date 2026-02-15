
import * as z from 'zod'

export const loginSchema = z.object({
    email: z.string().nonempty("This Field Required").regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "In Valid Mail"),
    password: z.string().nonempty("This Field Required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/, "Should Contain Special and Capital Characters").min(6, "at least 6 characters"),
})

//  zod make my type inteface 
export type loginSchemaType = z.infer<typeof loginSchema>
