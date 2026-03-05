import { getAllOrders } from '@/api/getAllOrders.api';
import { OrderType } from '@/types/Order.type';
import { getVerifyTokenFun } from '@/Utilities/getVerifyToken';
import Link from 'next/link';


export default async function page() {

    const data = await getVerifyTokenFun()    

    const idUser = data?.data.decoded.id

    const orders = await getAllOrders(idUser)


    return (
        <>
            <div className='container mx-auto w-[98%] lg:w-[95%] xl:w-[90%] my-7'>
                <h2 className='text-emerald-500 font-semibold my-3 text-xl lg:text-2xl xl:text-3xl pl-1 text-center'>Orders</h2>
                <hr />
                <Link href={"/cart"}> <div className='bg-blue-300 my-4 text-white text-md md:text-lg lg:text-xl py-1 px-2 lg:py-2 lg:px-3 inline-block rounded-lg lg:rounded-xl ml-2'> + New Order</div></Link>

                <div>
                    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base">
                        <table className="w-full text-sm rtl:text-right text-body text-center rounded-xl overflow-hidden">
                            <thead className="text-sm text-body bg-violet-400 border-b border-default ">
                                <tr>
                                    <th scope="col" className="px-2 lg:px-4 xl:px-6  py-3 font-medium">
                                        Order Id
                                    </th>
                                    <th scope="col" className="px-2 lg:px-4 xl:px-6  py-3 font-medium">
                                        Type
                                    </th>
                                    <th scope="col" className="px-2 lg:px-4 xl:px-6  py-3 font-medium">
                                        Total Price
                                    </th>
                                    <th scope="col" className="px-2 lg:px-4 xl:px-6  py-3 font-medium">
                                        Items
                                    </th>
                                    <th scope="col" className="px-2 lg:px-4 xl:px-6  py-3 font-medium">
                                        Created At
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((ord: OrderType) => {
                                    return <tr className="bg-neutral-primary border-b border-default" key={ord._id}>
                                        <th scope="row" className="px-2 lg:px-4 xl:px-6  py-3  font-medium text-heading whitespace-nowrap">
                                            #{ord.id}
                                        </th>
                                        <td className="px-2 lg:px-4 xl:px-6  py-3  ">
                                            {ord.paymentMethodType == "cash" ? <span className='bg-yellow-400 py-2 px-3 rounded-xl text-white font-semibold'> {ord.paymentMethodType} </span>
                                                : <span className='bg-emerald-500 py-2 px-3 rounded-xl text-white font-semibold'> {ord.paymentMethodType} </span>}
                                        </td>
                                        <td className="px-2 lg:px-4 xl:px-6  py-3 ">
                                            {ord.totalOrderPrice} EGP
                                        </td>
                                        <td className="px-2 lg:px-4 xl:px-6  py-3 ">
                                            {ord.cartItems.reduce((sum, item) => sum + item.count, 0)} Item
                                        </td>
                                        <td className="px-2 lg:px-4 xl:px-6  py-3 ">
                                            {new Date(ord.createdAt).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short"
                                            })}
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </>
    )
}

