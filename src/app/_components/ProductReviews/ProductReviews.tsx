import { getProductReview } from "@/ReviewProduct/getReviewsForProduct";
import Image from "next/image";
import img from "../../../Images/user-icon.jpg"
import { ProductReview } from "@/types/ProductReview.type";
import AddReviewForProduct from "../AddReviewForProduct/AddReviewForProduct";
import UpdateReviewProduct from "../UpdateReviewProduct/UpdateReviewProduct";
import { getVerifyTokenFun } from "@/Utilities/getVerifyToken";
import DeleteReviewProduct from "../DeleteReviewProduct/DeleteReviewProduct";

export default async function ProductReviews({ revId }: { revId: string }) {

    const data = await getVerifyTokenFun()
    console.log(data);
    const userId = data?.data.decoded.id

    const reviews = await getProductReview(revId)

    console.log(reviews.data);
    return (
        <>
            <h2 className="text-emerald-500 text-xl my-3 font-bold">Reviews</h2>
            {userId && <AddReviewForProduct id={revId} />}
            <div>
                {reviews.data.map((rev: ProductReview) => {
                    return <div key={rev._id} className="border border-gray-300 rounded-xl p-2 my-3">
                        <div className="flex flex-nowrap gap-2 items-center">
                            <Image src={img} alt="userIcon" className=" w-7 h-7  object-center rounded-full border border-gray-300 p-0.5 " />
                            <p className="text-lg text-gray-600 font-semibold">{rev.user.name}</p>
                        </div>
                        <div className="flex flex-wrap flex-col pt-1 px-1">
                            <p><i className="fa-solid fa-star text-amber-300 text-sm mr-1"></i>{rev.rating}</p>
                            <h3 className="text-emerald-500 text-lg font-semibold ">{rev.review}</h3>
                        </div>
                        <div>
                            {userId == rev.user._id && <UpdateReviewProduct id={rev._id} />}
                            {userId == rev.user._id && <DeleteReviewProduct id={rev._id} />}
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}
