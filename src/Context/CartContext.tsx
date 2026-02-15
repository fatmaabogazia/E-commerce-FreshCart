"use client";

import { cartProductForUser } from "@/ActionsCart/cartProductForUser.action";
import React, { createContext, useEffect, useState, ReactNode } from "react";


type CartContextType = {
    cartItems: number;
    setCartItems: React.Dispatch<React.SetStateAction<number>>;
};


type CartProviderProps = {
    children: ReactNode;
};

// ممكن يرجع null لو استخدمناه بره البيروفيدر بتاعه اللي في ال layout
export const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<number>(0);

    async function getProductsInCart() {
        try {
            const res = await cartProductForUser();

            if (res.status === "success") {
                let sum = 0;

                res.data.products.forEach((product: { count: number }) => {
                    sum += product.count;
                });

                setCartItems(sum);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        function flag() {
            getProductsInCart();
        }
        
        flag()
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
}
