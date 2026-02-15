"use client" // as react component

// import { getServerSession } from 'next-auth'
// import { authOptions } from '../../../auth'
// import { redirect } from 'next/navigation';

import Image from 'next/image';
import { ProductCartType } from '@/types/ProductCart.type';
import { Button } from '@/components/ui/button';
import { cartProductForUser } from '@/ActionsCart/cartProductForUser.action';
import { deleteFromCart } from '@/ActionsCart/deleteFromCart.action';
import { deleteAllCart } from '@/ActionsCart/deleteAllCart.action';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { updateCart } from '@/ActionsCart/updateCart.action';
import Link from 'next/link';
import { CartContext } from '@/Context/CartContext';


export default function Cart() {

  // // داا لو server component 
  // let session = await getServerSession(authOptions);
  // console.log(session);

  // // client compomnent==> use ==> hook ==> useSession ==> EXAMLPE ==> Nav bar

  // // علشان نحمي الصفحه لو مش معمول لوجين علشان متكنش موجوده ف الروت خالص
  // if (!session) {
  //   redirect("/login")
  // }

  const [products, setProducts] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingQty, setIsLoadingQty] = useState(false)
  const [currentId, setCurrentId] = useState("")

  const [cartId, setCartId] = useState("")

  // const [disabledBtn, setDisabledBtn] = useState(false)
  const [disabledBtnDel, setDisabledBtnDel] = useState(false)
  const [disabledBtnUpdate, setDisabledBtnUpdate] = useState(false)

  const { cartItems, setCartItems } = useContext(CartContext)!

  async function productsCartFun() {
    const res = await cartProductForUser()
    console.log(res);

    if (res.status == "success") {
      setProducts(res.data.products)
      setSubtotal(res.data.totalCartPrice)
      setIsLoading(false)
      setCartId(res.cartId)
    } else {
      setIsLoading(false)
    }

  }

  async function deleteProductFun(id: string) {
    setDisabledBtnDel(true)
    setDisabledBtnUpdate(true)

    const res = await deleteFromCart(id)

    if (res.status === "success") {
      setProducts(res.data.products)
      setSubtotal(res.data.totalCartPrice)
      setDisabledBtnDel(false)
      setDisabledBtnUpdate(false)
      toast("Product Deleted successfully", { position: "top-center" })

      let sum = 0
      res.data.products.forEach((product: ProductCartType) => {
        sum += product.count
      })
      setCartItems(sum)

    } else {
      toast("You Can't Delete This Product Now!", { position: "top-center" })
      setDisabledBtnDel(false)
      setDisabledBtnUpdate(false)
    }
  }

  async function updatedCartFun(count: string, id: string, sign: string) {
    setCurrentId(id)
    setIsLoadingQty(true)
    setDisabledBtnUpdate(true)
    setDisabledBtnDel(true)

    const res = await updateCart(count, id)
    if (res.status === "success") {
      setProducts(res.data.products)
      setSubtotal(res.data.totalCartPrice)
      setIsLoadingQty(false)
      setDisabledBtnUpdate(false)
      setDisabledBtnDel(false)

      if (sign == "-") {
        setCartItems(cartItems - 1)
      } else if (sign == "+") {
        setCartItems(cartItems + 1)
      }

    } else {
      setIsLoadingQty(false)
      setDisabledBtnUpdate(false)
    }
  }

  async function deleteAllCartFun() {
    const res = await deleteAllCart()
    if (res.message === "success") {
      setProducts([])
      setSubtotal(0)
      toast("Deleted Successefully , Your Cart Empty Now!", { position: "top-center" })
      setCartItems(0)
    } else {
      toast("You Can't Delete Cart Now!", { position: "top-center" })
    }
    console.log(res);

  }

  useEffect(() => {
    function flag() {
      productsCartFun()
    }

    flag()
  }, [])


  // const subtotal = productCart?.reduce(
  //   (acc: number, item: ProductCartType) =>
  //     acc + item.price * item.count, 0);


  return (
    <>
      {isLoading ? <div className='h-screen flex justify-center items-center'>
        <span className="loader"></span>
      </div> : products.length > 0 ? <div className='container mx-auto w-[95%] lg:w-[90%] xl:w-[80%] bg-gray-100 p-8 my-5'>
        <div className='flex justify-between'>
          <h2 className='text-2xl  text-emerald-500 font-semibold'>Shoping Cart</h2>
          <div> <i className="fa-regular fa-trash-can text-emerald-500 font-bold cursor-pointer" title='Clear All Cart' onClick={deleteAllCartFun}></i></div>
        </div>
        <div className='flex justify-end'>price</div>
        <hr className='my-3 h-0.5 rounded-2xl bg-slate-300' />
        {products.map((prod: ProductCartType) => {
          return <div key={prod._id} className='my-5'>
            <div className='flex lg:h-70 gap-3 '>
              <div className='w-1/4'>
                <Image src={prod?.product?.imageCover} alt='image Product' width={100} height={100} className='w-full lg:h-full object-center' />
              </div>
              <div className='w-3/4'>
                <div className='flex justify-between'>
                  <div>
                    <h3 className='font-semibold text-md md:text-lg lg:text-xl'>{prod?.product?.title}</h3>
                    <p className='font-bold text-emerald-300'>{prod.product.category.name}</p>
                    <div className='capitalize font-semibold text-sm'>quantity : <span className='text-emerald-400'>{prod?.product?.quantity}</span></div>
                    <div className='font-semibold text-sm pt-2'><i className="fa-solid fa-star text-[#FFD43B]" ></i> <span className='text-emerald-400'>{prod?.product?.ratingsAverage}</span></div>
                    <div className=' items-center my-4 p-1 border-2 border-yellow-300 rounded-4xl inline-block'>
                      <Button disabled={disabledBtnUpdate} className='p-2 bg-transparent rounded-full border-2 border-transparent text-black hover:bg-transparent hover:text-black hover:cursor-pointer hover:border-black' onClick={() => { updatedCartFun(`${prod.count - 1}`, prod.product._id, "-") }} ><i className="fa-solid fa-minus"></i></Button>
                      {isLoadingQty ? currentId == prod.product.id ? <span className="loaderQty"></span> : <span className='mx-2 font-bold'>{prod.count}</span> : <span className='mx-2 font-bold'>{prod.count}</span>}
                      <Button disabled={disabledBtnUpdate} className='p-2 bg-transparent rounded-full border-2 border-transparent text-black hover:bg-transparent hover:text-black hover:cursor-pointer hover:border-black' onClick={() => { updatedCartFun(`${prod.count + 1}`, prod.product._id, "+") }} ><i className="fa-solid fa-plus"></i></Button>
                    </div>
                    <div className='flex gap-3'>
                      <Button disabled={disabledBtnDel} className='bg-red-700 text-white hover:bg-red-800 hover:text-white hover:cursor-pointer' onClick={() => { deleteProductFun(prod.product._id) }}><i className="fa-regular fa-trash-can"></i>Delete</Button>
                    </div>
                  </div>

                  <div>
                    <p className='font-semibold text-sm-end lg:text-xl'>{prod.price * prod.count}EGP</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className='my-3  h-0.5 rounded-2xl bg-slate-300' />

          </div>
        })}

        <div className='flex justify-end text-xl font-semibold text-emerald-500'>Subtotal : <span className='text-black'>&nbsp; {subtotal} EGP</span></div>
        <div className='flex justify-end gap-3 my-3'>
          <Link href={`/checkOut/${cartId}`}>  <Button className='bg-emerald-600 text-white hover:bg-emerald-800 hover:text-white hover:cursor-pointer '>Check Out By Cash</Button>  </Link>
          <Link href={`/checkOutCard/${cartId}`}>  <Button className='bg-emerald-600 text-white hover:bg-emerald-800 hover:text-white hover:cursor-pointer '>Check Out By Card</Button>  </Link>
        </div>
      </div>
        : <div className='my-10 '> <h3 className='font-semibold text-xl text-center text-emerald-500'>No Products In Your Cart Now!</h3> <Link href='/products' className='flex justify-center my-5'><Button className='bg-emerald-500 text-xl font-semibold p-5'> Shop Now</Button> </Link> </div>}

    </>
  )
}
