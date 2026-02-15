"use client"
import imgLogo from '../../Images/freshcart-logo.svg'
import Image from 'next/image'

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import axios from "axios"
import { toast } from "sonner"
// import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { loginSchema, loginSchemaType } from '@/schema/login.schema'
import { signIn } from 'next-auth/react'


export default function Login() {
  // let router = useRouter()

  const [disabledBtn, setDisabledBtn] = useState(false)

  // علشان لو زودت حاجه مش موجوده يعمل ايرور 
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  const { handleSubmit } = form;

  async function getLogindata(values: loginSchemaType) {
    setDisabledBtn(true)
    // values ==> {
    //   email: "ddf",
    //   password:"sxdcfvg"
    // }

    const res = await signIn("credentials", {

      email: values.email,
      password: values.password,
      // علشان يروح لصفحه الهووم بعد اما يخلص
      // بس احنا هنعملها فولس علشان لو حتي غلط هيروح لصفحه تانيه
      redirect: false,
      callbackUrl: "/"
    })

    if (res?.ok) {
      setDisabledBtn(false)
      toast.success("You Logged Successfully", { position: "top-center" })
      
      // هنعمل ويندو علشام يعمل رفريش علشان هو لازم يعمل رفريش علشان هو بيعمل حاجه اسمها سيشن ودي اللي بيتخزن فيها المعلومات وهو لازم يعمل رفريش علشان يخزن المعلومات ف السيشن دي
      window.location.href = "/"
    } else {
      setDisabledBtn(false)
      toast.error(`${res?.error}`, { position: "top-center" })
    }

    // return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((res) => {
    //   if (res.data.message == "success") {
    //     toast.success("You Logged Successfully", { position: "top-center" })
    //     router.push("/")
    //     setDisabledBtn(true)
    //   }
    // }).catch((err) => {
    //   toast.error(`${err.response.data.message}`, { position: "top-center" })
    // })

  }

  return (
    <>
      <div className='mx-auto py-5'>
        <Image src={imgLogo} alt='Logo Image' className='mx-auto' />
      </div>

      <div className='container w-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%] mx-auto'>

        <div className='rounded-2xl border border-slate-400 py-6 px-3 '>
          <h1 className='font-semibold text-2xl pb-5'>Sign in</h1>
          <form onSubmit={handleSubmit(getLogindata)}>

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
                    <FieldLabel htmlFor="input-field-password" className='text-lg '>Your Password</FieldLabel>
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

            <Button disabled={disabledBtn} className='rounded-2xl bg-emerald-500 w-[85%] mx-auto block hover:bg-emerald-700' type='submit'>Continue </Button>
          </form>

          <hr className='my-6' />

          <div className='text-sm'>
            <Link href={"/forgotPassword"}> <h2 className='text-emerald-500 font-semibold pb-3 underline hover:translate-y-px'>Forgot Password</h2> </Link>
            By signing in, you agree to FreshCart&apos;s <span className='text-emerald-400 font-semibold underline'>Conditions of Use </span>  and <span className='text-emerald-400 font-semibold underline'>Privacy Notice. </span>
          </div>
        </div>

        <div className='pt-8 pb-4 flex items-center'>
          <div className='w-2/6 h-px bg-gray-300 '></div>
          <div className='w-2/6  text-gray-400 text-sm mx-auto text-center'>New to FreshCart?</div>
          <div className='w-2/6 h-px bg-gray-300 '></div>
        </div>
        <Link href={"/register"}>
          <div className='rounded-2xl border border-gray-400 text-gray-800 bg-transparent w-full mx-auto block text-sm hover:bg-gray-300 p-2 text-center' >Create your FreshCart account </div>
        </Link>
      </div>
    </>
  )
}
