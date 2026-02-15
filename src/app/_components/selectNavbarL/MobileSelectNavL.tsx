
"use client";

import { useRouter } from "next/navigation";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";


const MobileSelectNavL = () => {
    const router = useRouter();

    return (
        <NativeSelect
            defaultValue={""}
            onChange={(event) => {
                const value = event.currentTarget.value;
                if (value) {
                    router.push(value);
                }
            }}
        >
            <NativeSelectOption value={""}>Select Your Page</NativeSelectOption>
            <NativeSelectOption value="/products">Products</NativeSelectOption>
            <NativeSelectOption value="/categories">Categories</NativeSelectOption>
            <NativeSelectOption value="/brands">Brands</NativeSelectOption>
        </NativeSelect>
    );
};


export default MobileSelectNavL;
