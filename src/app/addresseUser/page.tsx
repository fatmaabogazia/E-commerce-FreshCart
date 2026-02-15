"use client"

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { addAddressSchema, addAddressSchemaType } from '@/schema/addAddress.schema'
import { addAddress } from '@/AddresseApis/addAddress'
import { getUserAddresses } from "@/AddresseApis/getAddressData"
import { removeAddress } from "@/AddresseApis/removeAddress"


export default function AddressesUser() {

    const [disabled, setDisabled] = useState(false)
    const [addressData, setAddressData] = useState([])

    const form = useForm<addAddressSchemaType>({
        defaultValues: {
            name: "",
            details: "",
            phone: "",
            city: ""
        },
        resolver: zodResolver(addAddressSchema)
    })

    const { handleSubmit } = form

    async function addAddresseFun(values: addAddressSchemaType) {
        setDisabled(true)
        try {
            const res = await addAddress(values)
            if (res.status === "success") {
                toast.success(res.message, { position: "top-center" })
                setDisabled(false)
                setAddressData(res.data)
                form.reset()
            } else {
                toast.success("Your Addresse Not Added , Please Try Again!", { position: "top-center" })
                setDisabled(false)
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid Found Error , Try Again", { position: "top-center" })
            setDisabled(false)
        }
    }

    async function getUserAddressesFun() {
        try {

            const res = await getUserAddresses()

            if (res.status === "success") {
                setAddressData(res.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function removeAddressFun(id: string) {

        try {
            const res = await removeAddress(id)

            if (res.status === "success") {
                toast.success(res.message, { position: "top-center" })
                setAddressData(res.data)
            }
        } catch (error) {
            console.log(error)
            toast.success("Address Not Deleted", { position: "top-center" })
        }
    }

    useEffect(() => {
        function flag() {
            getUserAddressesFun()
        }
        
        flag()
    }, [])

    return (
        <>
            {/*   */}
            <div className="container md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto mt-7">
                {addressData.length > 0 && <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                            <tr>
                                <th scope="col" className="px-2 lg:px-4 xl:px-6 py-3 font-medium">
                                    Name
                                </th>
                                <th scope="col" className="px-2 lg:px-4 xl:px-6 py-3 font-medium">
                                    Details
                                </th>
                                <th scope="col" className="px-2 lg:px-4 xl:px-6 py-3 font-medium">
                                    City
                                </th>
                                <th scope="col" className="px-2 lg:px-4 xl:px-6 py-3 font-medium">
                                    Phone
                                </th>
                                <th scope="col" className="px-2 lg:px-4 xl:px-6 py-3 font-medium">
                                    Delete
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {addressData.map((addr: { name: string, details: string, city: string, phone: string, _id: string }) => {
                                return <tr className="bg-neutral-primary-soft border-b  border-default" key={addr._id}>
                                    <th scope="row" className="px-2 lg:px-4 xl:px-6 py-4 font-medium text-heading whitespace-nowrap">
                                        {addr.name}
                                    </th>
                                    <td className="px-2 lg:px-4 xl:px-6 py-4">
                                        {addr.details}
                                    </td>
                                    <td className="px-2 lg:px-4 xl:px-6 py-4">
                                        {addr.city}
                                    </td>
                                    <td className="px-2 lg:px-4 xl:px-6 py-4">
                                        {addr.phone}
                                    </td>
                                    <td className="px-2 lg:px-4 xl:px-6 py-4">
                                        <Button onClick={() => { removeAddressFun(addr._id) }} className="bg-transparent font-semibold text-lg text-red-700  hover:text-red-800 hover:bg-transparent hover:cursor-pointer "> <i className="fa-regular fa-trash-can" title="Delete Your Address"></i></Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>}

            </div>

            <div className='mt-7 rounded-2xl border border-slate-400 py-6 px-3 w-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%] mx-auto'>
                <h1 className='font-semibold text-2xl pb-5'>Add Address</h1>
                <form onSubmit={handleSubmit(addAddresseFun)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className='mb-5'>
                                    <FieldLabel htmlFor="input-field-name" className='text-lg'>Name </FieldLabel>
                                    <Input
                                        {...field}
                                        className='border border-black'
                                        id="input-field-name"
                                        type="text"
                                        placeholder="Enter Name Of Addresse [Home ,Work ,Family's Home]"
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
                            name="details"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className='mb-5'>
                                    <FieldLabel htmlFor="input-field-details" className='text-lg'>Details Of Addresse</FieldLabel>
                                    <Input
                                        {...field}
                                        className='border border-black'
                                        id="input-field-details"
                                        type="text"
                                        placeholder="Enter Details Addresse"
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
                                    <FieldLabel htmlFor="input-field-phone" className='text-lg'>Enter Your Phone</FieldLabel>
                                    <Input
                                        {...field}
                                        className='border border-black'
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
                                    <FieldLabel htmlFor="input-field-city" className='text-lg'>Enter Your City</FieldLabel>
                                    <Input
                                        {...field}
                                        className='border border-black'
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

                    <Button disabled={disabled} className='rounded-2xl bg-emerald-500 w-[85%] mx-auto block hover:bg-emerald-700' type='submit'>Add New Address</Button>
                </form>
            </div>
        </>
    )
}
