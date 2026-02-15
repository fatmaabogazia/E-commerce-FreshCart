

import z from 'zod'

export const checkOutOrdersSchema = z.object({
    details: z.string().nonempty("This Is Requird").min(5, "Minemum Is 5 Characters").max(50, "Maximum Is 50 characters"),
    phone: z.string().nonempty("This Is Requird").regex(/^01[0125][0-9]{8}$/, "Should Egyption Number"),
    city: z.string().nonempty("This Is Requird").min(4, "Minemum Is 4 Characters").max(20, "Maximum Is 20 characters")
})

export type checkOutOrdersSchemaType = z.infer<typeof checkOutOrdersSchema>