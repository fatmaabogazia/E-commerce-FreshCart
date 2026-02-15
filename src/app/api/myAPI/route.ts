import { getCategories } from "@/api/getCategories.api"
import { NextResponse } from "next/server"
// import { NextRequest, NextResponse } from "next/server"

// should called name function == name method for API
export async function GET() {
// export async function GET(request: NextRequest) {

    // let data = [
    //     { id: 1, name: "fatma", age: 20 },
    //     { id: 2, name: "hatem", age: 15 },
    //     { id: 3, name: "manal", age: 30 },
    //     { id: 4, name: "mahmoud", age: 40 },
    //     { id: 5, name: "sabahy", age: 35 },
    // ]

    // let data = {
    //     message: "success",
    //     result: "ok",
    //     user: [
    //         { id: 1, name: "fatma", age: 20 },
    //         { id: 2, name: "hatem", age: 15 },
    //         { id: 3, name: "manal", age: 30 },
    //         { id: 4, name: "mahmoud", age: 40 },
    //         { id: 5, name: "sabahy", age: 35 },
    //     ]
    // }

    // وممكن كماان نجيب api جاهز ويبقي كداا انا حميته بس برضو مش ميه ف الميه علشان هو ممكن ياخد بتاعي ويعمل عليه ريكوستات كتير ويقع برضوو 
    const data = await getCategories()

    return NextResponse.json(data)
}

// Route Handler