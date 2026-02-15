"use client"
import imgLogo from '../../../Images/freshcart-logo.svg'
import Image from 'next/image'

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { checkOutOrdersSchema, checkOutOrdersSchemaType } from '@/schema/checkOutOrders.schema'
import { cardOrder } from '@/checkOutActions/CardOrder.action'

export default function CheckOutCard() {

    const { idCart }: { idCart: string } = useParams()
    const router = useRouter()


    const [disabledBtn, setDisabledBtn] = useState(false)

    const form = useForm<checkOutOrdersSchemaType>({
        defaultValues: {
            details: "",
            phone: "",
            city: ""
        },
        resolver: zodResolver(checkOutOrdersSchema)
    })

    const { handleSubmit } = form;

    async function checkOutOrdersCard(values: checkOutOrdersSchemaType) {
        console.log(values);
        setDisabledBtn(true)
        const res = await cardOrder(idCart , values)
        console.log(res);

        if (res.status == "success") {
            toast.success("Your Order has been Placed Successfully", { position: "top-center" })
            setDisabledBtn(false)
            router.push(`${res.session.url}`)
        } else {
            toast.error("Your Cart Is Empty , Try Again!", { position: "top-center" })
            setDisabledBtn(false)
        }
    }


    return (
        <>
            <div className='mx-auto py-5'>
                <Image src={imgLogo} alt='Logo Image' className='mx-auto' />
            </div>

            <div className='container w-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%] mx-auto'>
                <div className='rounded-2xl border border-slate-400 py-6 px-3 '>
                    <h1 className='font-semibold text-2xl pb-5'>Check Out Your Order</h1>
                    <form onSubmit={handleSubmit(checkOutOrdersCard)}>
                        <FieldGroup>
                            <Controller
                                name="details"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className='mb-5'>
                                        <FieldLabel htmlFor="input-field-details" className='text-lg '>Your Details Address</FieldLabel>
                                        <Input
                                            {...field}
                                            className='border border-black '
                                            id="input-field-details"
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && fieldState.isTouched && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <FieldGroup>
                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className='mb-5'>
                                        <FieldLabel htmlFor="input-field-phone" className='text-lg '>Your Phone</FieldLabel>
                                        <Input
                                            {...field}
                                            className='border border-black '
                                            id="input-field-phone"
                                            type="tel"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && fieldState.isTouched && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <FieldGroup>
                            <Controller
                                name="city"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className='mb-5'>
                                        <FieldLabel htmlFor="input-field-city" className='text-lg '>Your City</FieldLabel>
                                        <Input
                                            {...field}
                                            className='border border-black '
                                            id="input-field-city"
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && fieldState.isTouched && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <Button disabled={disabledBtn} className='rounded-2xl bg-emerald-500 w-[85%] mx-auto block hover:bg-emerald-700' type='submit'>Pay Now</Button>

                    </form>
                </div>

            </div>
        </>
    )
}
