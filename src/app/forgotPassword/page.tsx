"use client"
import imgLogo from '../../Images/freshcart-logo.svg'
import Image from 'next/image'

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useState } from 'react'
import * as z from "zod"
import axios from 'axios'


export default function ForgotPassword() {

    const [disabledBtn, setDisabledBtn] = useState(false)

    const forgotPasswordSchema = z.object({
        email: z.email().nonempty("This Field Required").regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "In Valid E-Mail"),
    })

    type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

    const form = useForm<forgotPasswordSchemaType>({
        defaultValues: {
            email: ""
        },
        resolver: zodResolver(forgotPasswordSchema)
    })

    const { handleSubmit } = form;

    async function getforgotPasswordData(values: forgotPasswordSchemaType) {
        console.log(values);
        setDisabledBtn(true)

        return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then((res) => {
            // console.log(res);

            if (res.data.message == "success") {
                toast.success("You Logged Successfully", { position: "top-center" })
                setDisabledBtn(false)
            } else {
                toast.error(res.data.message, { position: "top-center" })
                setDisabledBtn(false)
            }
        }).catch((err) => {
            setDisabledBtn(false)
            toast.error(err.response.data.message, { position: "top-center" })
            console.log(err.response);
        })
    }

    return (
        <>
            <div className='mx-auto py-5'>
                <Image src={imgLogo} alt='Logo Image' className='mx-auto' />
            </div>

            <div className='container w-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%] mx-auto'>
                <div className='rounded-2xl border border-slate-400 py-6 px-3 '>
                    <h1 className='font-semibold text-2xl pb-5'>Forgot Password</h1>
                    <form onSubmit={handleSubmit(getforgotPasswordData)}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className='mb-5'>
                                        <FieldLabel htmlFor="input-field-email" className='text-lg '>Your Email</FieldLabel>
                                        <Input
                                            {...field}
                                            className='border border-black '
                                            id="input-field-email"
                                            type="email"
                                            placeholder="Enter Your Email"
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

                        <Button disabled={disabledBtn} className='rounded-2xl bg-emerald-500 w-[85%] mx-auto block hover:bg-emerald-700' type='submit'>Continue </Button>
                    </form>
                </div>

                <Link href={"/login"} >
                    <div className='mt-5 rounded-2xl border border-gray-400 text-gray-800 bg-transparent w-full mx-auto block text-sm hover:bg-gray-300 p-2 text-center' > Sign In</div>
                </Link>
            </div>
        </>
    )
}
