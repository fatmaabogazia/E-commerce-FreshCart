// "use client" // ==> علشان ال onClick بس مينعش نحطه هناا علشان كدااا ال seo مش هيشوفه

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from 'next/image';
import { Producttype } from '@/types/Products.type';
import AddToCartBTN from "../AddToCartBTN/AddToCartBTN";
import AddToWishlist from "../AddToWishlist/AddToWishlist";

export default function SingleProduct({ prod }: { prod: Producttype }) {

    return (
        <>
            <Card className="relative group overflow-hidden">
                <Link href={`/products/${prod.id}`} key={prod.id}>
                    <CardHeader>
                        <CardTitle ><Image src={prod.imageCover} alt="image product" className='w-full ' width={200} height={200} /></CardTitle>
                        <CardDescription className="text-emerald-500">{prod.category.name}</CardDescription>
                        <CardDescription className="font-semibold text-large line-clamp-1">{prod.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-between">
                        <p>{prod.price}<span className="uppercase"> egp</span></p>
                        <p><i className="fa-solid fa-star text-amber-300"></i>{prod.ratingsAverage}</p>
                    </CardContent>
                </Link>
                <CardFooter>
                    <AddToCartBTN id={prod.id} />
                </CardFooter>
                <AddToWishlist id={prod.id}/>
            </Card>
        </>
    )
}
