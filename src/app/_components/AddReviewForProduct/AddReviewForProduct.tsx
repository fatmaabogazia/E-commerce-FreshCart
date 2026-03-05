"use client"
import {
    AlertDialog,
    // AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    // AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addReviewForProduct } from "@/ReviewProduct/addReview";
import { addReviewSchema, addReviewSchemaType } from "@/schema/addReviewProduct.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";


export default function AddReviewForProduct({ id }: { id: string }) {

    // const [productID, setProductID] = useState()
    const router = useRouter()

    const form = useForm<addReviewSchemaType>({
        defaultValues: {
            review: "",
            rating: ""
        },
        resolver: zodResolver(addReviewSchema)
    })

    const { handleSubmit } = form;

    async function addReview(values: addReviewSchemaType) {

        const res = await addReviewForProduct(id, values)

        console.log(res);
        if (res.message === "fail") {
            toast.error(res.errors.msg, { position: "top-center" })
        } else {
            toast.success("Your Review Added Successfully", { position: "top-center" })
            form.reset()
            // setProductID(res.data.product)
            router.refresh()
        }
    }

    return (
        <>
            <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"outline"} className="border border-gray-300 rounded-xl px-5 py-0.5 hover:bg-emerald-500 hover:text-white hover:cursor-pointer">  Add Review </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you Want To Add Review sure?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <form action="" onSubmit={handleSubmit(addReview)}>
                            <Controller
                                name="review"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Enter your Review</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            type="text"
                                        // autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="rating"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name} className="pt-2">Enter Your Rating</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            type="text"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Button type="submit" className="mt-3 w-full bg-emerald-500 text-white rounded-xl hover:bg-emerald-700 hover:cursor-pointer">Add</Button>

                        </form>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>

                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </>
    )
}
