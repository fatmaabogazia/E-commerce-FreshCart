"use client"; // ==> directive ==> يعني لازم يتحط في الاول خالص

import Link from "next/link";
import { usePathname } from "next/navigation";
import img from "../../../Images/freshcart-logo.svg";
import imgMini from "../../../Images/Mini Logo.png";
import imgCart from "../../../Images/icon-cart-right.png";
import Image from "next/image";

import MobileSelectNavL from "../selectNavbarL/MobileSelectNavL";
import MobileSelectNavM from "../selectNavbarM/MobileSelectNavM";
import SelectNavLogosL from "../selectNavLogosL/SelectNavLogosL";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "@/Context/CartContext";


export default function Navbar() {
  // to know active link ==> use hook usePathname()
  // لكن علشان نستخدم اي هوووك لالزم يكون هو من النوع client او ابوه من نوع
  // لكن لو حطينا عند ابوه اللي معملهم امبورت بس هو اللي هيبقي من نوع  Client Component

  const path = usePathname();
  const { cartItems } = useContext(CartContext)!

  const { data: session, status } = useSession()
  // console.log(session);
  // console.log(status); //  ==> loading (in start) - authenticated - unauthenticated (signOut)

  function logOut() {
    signOut({
      callbackUrl: "/login"
    })
  }


  return (
    <>
      <div className="navbarDiv bg-slate-200" >
        <div className="container lg:w-[90%] xl:w-[80%] mx-auto p-3 flex justify-between">
          <div className="left flex items-center justify-between md:gap-1 lg:gap-4 xl:gap-5">
            <Link href={"/"}>
              <Image src={img} alt="logo" className="w-full lg:inline hidden" />
              <Image src={imgMini} alt="logo" className="size-10 md:size-12 p-0 object-center inline lg:hidden " />
            </Link>
            <ul className="xl:flex gap-5 text-gray-500 hidden ">
              <li className={`${path == "/" ? "active" : ""}`}>
                <Link href={"/"}>Home</Link>
              </li>

              <li className={`${path == "/cart" ? "active" : ""}`}>
                <Link href={"/cart"} className="flex gap-1 items-center"> {cartItems>0 &&  <div className="relative">  <Image src={imgCart} alt="iconCart Image" className="size-6 object-center" />
                  <span className="cartIcon absolute text-emerald-500 text-sm"> {cartItems}</span> </div>}
                  Cart</Link>
              </li>
              {/* {session && <li className={`${path == "/cart" ? "active" : ""}`}>
                <Link href={"/cart"}>Cart</Link>
              </li>} */}

              <li className={`${path == "/products" ? "active" : ""}`}>
                <Link href={"/products"}>Products</Link>
              </li>
              <li className={`${path == "/categories" ? "active" : ""}`}>
                <Link href={"/categories"}>Categories</Link>
              </li>
              <li className={`${path == "/brands" ? "active" : ""}`}>
                <Link href={"/brands"}>Brands</Link>
              </li>
            </ul>

            <div className=" hidden lg:flex lg:items-center lg:gap-5 xl:hidden">
              <ul className="flex gap-5 text-gray-500 ">
                <li className={`${path == "/" ? "active" : ""}`}>
                  <Link href={"/"}>Home</Link>
                </li>
                {/* <li className={`${path == "/cart" ? "active" : ""}`}>
                  <Link href={"/cart"}>Cart</Link>
                </li> */}
                <li className={`${path == "/cart" ? "active" : ""}`}>
                  <Link href={"/cart"} className="flex gap-1 items-center"> {cartItems > 0 && <div className="relative">  <Image src={imgCart} alt="iconCart Image" className="size-6 object-center" />
                    <span className="cartIcon absolute text-emerald-500 text-sm"> {cartItems}</span> </div>}
                    Cart</Link>
                </li>
              </ul>
              <MobileSelectNavL />
            </div>

            <div className=" md:flex md:items-center md:gap-5 lg:hidden">
              <MobileSelectNavM />
            </div>

          </div>

          <div className="right flex gap-5 items-center">
            <ul className="hidden xl:flex xl:gap-4 items-center">
              <li>
                <Link href={"https://www.instagram.com/"} target="blank">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link href={"https://www.facebook.com/"} target="blank">
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link href={"https://www.tiktok.com/"} target="blank">
                  <i className="fa-brands fa-tiktok"></i>
                </Link>
              </li>
              <li>
                <Link href={"https://www.twitter.com/"} target="blank">
                  <i className="fa-brands fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link href={"https://www.linkedin.com/"} target="blank">
                  <i className="fa-brands fa-linkedin"></i>
                </Link>
              </li>
              <li>
                <Link href={"https://www.youtube.com/"} target="blank">
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </li>
            </ul>

            <div className="hidden md:inline xl:hidden">
              <SelectNavLogosL />
            </div>

            <div className="flex items-center">
              {status == "loading" ? <h3 className="text-lg font-semibold">Hello ,</h3> :
                status == "authenticated" ? <div className="flex gap-1 md:gap-3 xl:gap-5 items-center "><Link href={"/wishlist"}> <i className="fa-regular fa-heart cursor-pointer text-md lg:text-xl font-semibold"></i> </Link>
                  <h3 className="text-sm md:text-lg font-semibold ">Hello , <span className="text-emerald-500 ">{(session?.user.name).split(" ")[0]}</span></h3>
                  <span className="text-sm font-semibold cursor-pointer" onClick={logOut}><span className="hidden lg:inline">Sign Out</span><span className="lg:hidden"><i className="fa-solid fa-arrow-right-from-bracket"></i> </span> </span> </div> :
                  <ul className="flex gap-3 xl:gap-5 items-center">
                    <li className="text-gray-500">
                      <Link href={"/login"}> Login</Link>
                    </li>
                    <li className="text-gray-500">
                      <Link href={"/register"}> Register</Link>
                    </li>
                  </ul>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



{/* <i className="fa-solid fa-cart-shopping text-emerald-600"></i>  */ }
