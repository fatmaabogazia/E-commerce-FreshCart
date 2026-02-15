"use client"

import imgLogo from '../../Images/freshcart-logo.svg'
import Image from 'next/image'

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, registerSchemaType } from '@/schema/register.schema'
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Register() {
  const router = useRouter()

  const [disabledBtn, setDisabledBtn] = useState(false)

  // علشان لو زودت حاجه مش موجوده يعمل ايرور 
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: '',
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(registerSchema)
  })

  const { handleSubmit } = form;

  async function getRegisterdata(values: registerSchemaType) {

    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((res) => {
      if (res.data.message == "success") {
        toast.success("Account Created Successfully", { position: "top-center" })
        router.push("/login")
        setDisabledBtn(true)
      }
    }).catch((err) => {
      console.log(err.response);
      toast.error(`${err.response.data.message}`, { position: "top-center" })
    })
  }

  return (
    <>
      <div className='mx-auto py-5'>
        <Image src={imgLogo} alt='Logo Image' className='mx-auto' />
      </div>

      <div className='rounded-2xl border border-slate-400 py-6 px-3 w-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%] mx-auto'>
        <h1 className='font-semibold text-2xl pb-5'>Create Account</h1>
        <form onSubmit={handleSubmit(getRegisterdata)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='mb-5'>
                  <FieldLabel htmlFor="input-field-username" className='text-lg'>Your Name</FieldLabel>
                  <Input
                    {...field}
                    className='border border-black'
                    id="input-field-username"
                    type="text"
                    placeholder="First and Last Name"
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
                    placeholder="Email Account"
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
                  <FieldLabel htmlFor="input-field-password" className='text-lg '>Password (at least 6 characters)</FieldLabel>
                  <Input
                    {...field}
                    className='border border-black '
                    id="input-field-password"
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

          <FieldGroup>
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='mb-5'>
                  <FieldLabel htmlFor="input-field-rePassword" className='text-lg '>re-enter Password</FieldLabel>
                  <Input
                    {...field}
                    className='border border-black '
                    id="input-field-rePassword"
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

          <FieldGroup>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='mb-5'>
                  <FieldLabel htmlFor="input-field-phone" className='text-lg '>Mobile Number</FieldLabel>
                  <Input
                    {...field}
                    className='border border-black '
                    id="input-field-phone"
                    type="tel"
                    placeholder='Mobile Number'
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

          <Button disabled={disabledBtn} className='rounded-2xl bg-emerald-500 w-[85%] mx-auto block hover:bg-emerald-700' type='submit'>Create New Account </Button>
        </form>

        <hr className='my-6' />

        <div className='mb-5'>
          <h3 className='font-semibold text-lg'>Already a customer?</h3>
          <span className='text-blue-400 underline'> <Link href={"/login"}> Sign in instead</Link></span>
        </div>
        <div className='text-sm'>
          By creating an account, you agree to FreshCart&apos;s <span className='text-emerald-400 font-semibold underline'>Conditions of Use </span>  and <span className='text-emerald-400 font-semibold underline'>Privacy Notice. </span>
        </div>

      </div>
    </>
  )
}
