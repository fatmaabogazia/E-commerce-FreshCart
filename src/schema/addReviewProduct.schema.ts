
import z from "zod"

export const addReviewSchema = z.object({
    review: z.string().nonempty("This Field Required"),
    rating: z.string().nonempty("This Field Required").regex(/^(?:[0-4](?:\.\d+)?|5(?:\.0+)?)$/, "Must number from 0 to 5")
})

export type addReviewSchemaType = z.infer<typeof addReviewSchema>
