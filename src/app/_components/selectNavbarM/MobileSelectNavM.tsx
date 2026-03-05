"use client";

import { useRouter } from "next/navigation";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useContext } from "react";
import { CartContext } from "@/Context/CartContext";


export default function MobileSelectNavM() {
  const router = useRouter();
  const { cartItems } = useContext(CartContext)!

  return (
    <NativeSelect
      aria-label="Pages SelectOption Navbar"
      defaultValue={""}
      onChange={(event) => {
        const value = event.currentTarget.value;
        if (value) {
          router.push(value);
        }
      }}
    >
      <NativeSelectOption value={""}>Select Your Page</NativeSelectOption>
      <NativeSelectOption value="/">Home</NativeSelectOption>
      <NativeSelectOption value="/cart" className="flex gap-1 items-center">Cart {cartItems > 0 && cartItems} </NativeSelectOption>
      <NativeSelectOption value="/products">Products</NativeSelectOption>
      <NativeSelectOption value="/categories">Categories</NativeSelectOption>
      <NativeSelectOption value="/brands">Brands</NativeSelectOption>
    </NativeSelect>
  );
};