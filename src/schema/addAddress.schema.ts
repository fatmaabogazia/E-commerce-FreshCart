
import z from "zod"

export const addAddressSchema = z.object({
    name: z.string().nonempty("This Requird").min(2, "Minimum 2 Characters").max(20, "Maxmum 20 Characters"),
    details: z.string().nonempty("This Requird").min(2, "Minimum 2 Characters").max(50, "Maxmum 50 Characters"),
    phone: z.string().nonempty("This Required").regex(/^01[0125][0-9]{8}$/, "Should Egyption Number"),
    city: z.string().nonempty("This Requird").min(2, "Minimum 2 Characters").max(20, "Maxmum 20 Characters"),
})

export type addAddressSchemaType = z.infer<typeof addAddressSchema>