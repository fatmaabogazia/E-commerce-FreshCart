"use client"
// import imgLogo from '../../Images/freshcart-logo.svg'
// import Image from 'next/image'

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema, changePasswordSchemaType } from '@/schema/changePassword.schema'
import { changePasswordApiFun } from '@/AuthenticationApis/ChangePassword'
import { toast } from 'sonner'
import { useState } from 'react'


export default function ChangePassword() {

    const [disabled, setDisabled] = useState(false)

    const form = useForm<changePasswordSchemaType>({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        resolver: zodResolver(changePasswordSchema)
    })

    const { handleSubmit } = form

    async function changePasswordFun(values: changePasswordSchemaType) {
        setDisabled(true)
        try {

            const res = await changePasswordApiFun(values)

            if (res.data.message === "success") {
                toast.success("Your Password Changed Successfully", { position: "top-center" })
                setDisabled(false)
            } else {
                toast.success("Your Password Not Changed , Please Try Again!", { position: "top-center" })
                setDisabled(false)
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid Found Error , Try Again", { position: "top-center" })
            setDisabled(false)
        }
    }


    return (
        <>

            <div className='mt-7 rounded-2xl border border-slate-400 py-6 px-3 w-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%] mx-auto'>
                <h1 className='font-semibold text-2xl pb-5'>Change Your Password</h1>
                <form onSubmit={handleSubmit(changePasswordFun)}>
                    <FieldGroup>
                        <Controller
                            name="currentPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className='mb-5'>
                                    <FieldLabel htmlFor="input-field-oldPass" className='text-lg'>Your Old Password</FieldLabel>
                                    <Input
                                        {...field}
                                        className='border border-black'
                                        id="input-field-oldPass"
                                        type="password"
                                        placeholder="Enter Your Old Password"
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
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className='mb-5'>
                                    <FieldLabel htmlFor="input-field-nPass" className='text-lg'>Your New Password</FieldLabel>
                                    <Input
                                        {...field}
                                        className='border border-black'
                                        id="input-field-nPass"
                                        type="password"
                                        placeholder="Enter Your New Password"
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
                            name="rePassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className='mb-5'>
                                    <FieldLabel htmlFor="input-field-rePass" className='text-lg'>Re-Password</FieldLabel>
                                    <Input
                                        {...field}
                                        className='border border-black'
                                        id="input-field-rePass"
                                        type="password"
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

                    <Button disabled={disabled} className='rounded-2xl bg-emerald-500 w-[85%] mx-auto block hover:bg-emerald-700' type='submit'>Change </Button>
                </form>

            </div>
        </>
    )
}
