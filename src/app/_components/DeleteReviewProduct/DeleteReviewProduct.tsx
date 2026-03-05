"use client"

import { Button } from "@/components/ui/button"
import { deleteReviewFun } from "@/ReviewProduct/deleteReviewOwner"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function DeleteReviewProduct({ id }: { id: string }) {

    const router = useRouter()
    async function deleteReview() {

        const res = await deleteReviewFun(id)
        console.log(res);
        if (res === undefined) {
            toast.success("Your Review Deleted Suuccessfully", { position: "top-center" })
            router.refresh()
        } else if (res.statusMsg == "fail") {
            toast.success("Your Review UnDeleted, Try Again!", { position: "top-center" })
        } else {
            toast.success("Your Must Logged in First", { position: "top-center" })
        }

    }

    return (
        <>
            <Button className="text-white bg-red-700 hover:bg-red-800 my-3 hover:text-white hover:cursor-pointer rounded-xl " onClick={deleteReview}>Delete Your Review </Button>
        </>
    )
}
