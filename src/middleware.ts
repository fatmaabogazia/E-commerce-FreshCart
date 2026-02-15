import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })
    console.log(request.nextUrl.pathname);

    if (token) {
        if (request.nextUrl.pathname == "/login" || request.nextUrl.pathname == "/register" || request.nextUrl.pathname == '/forgotPassword' ) {
            return NextResponse.redirect(new URL("/", request.url))
        } else {
            return NextResponse.next()
        }

        // هخليه يروح علي المرحله اللي بعدهاا
        // return NextResponse.next()
    } else {
        // لو عاوزه اعمل علي البرودكت ديتالز ==> request.nextUrl.pathname.includes("/products/")  
        if (request.nextUrl.pathname == "/cart" ||request.nextUrl.pathname == "/wishlist" ||request.nextUrl.pathname == "/addresseUser" ||request.nextUrl.pathname == "/allorders" ||request.nextUrl.pathname == "/changePassword" ||request.nextUrl.pathname.includes("/checkOut/")
            ||request.nextUrl.pathname.includes("/checkOutCard/") ) {
            // http://localhost:3000/login ==> يعني هيكتب في الباث كدااا
            return NextResponse.redirect(new URL('/login', request.url))
        } else {
            return NextResponse.next()
        }

    }

}

export const config = {
    matcher: ['/cart' , '/addresseUser','/allorders','/changePassword','/checkOut/:path*','/checkOutCard/:path*' ,'/wishlist', '/login', '/register', '/forgotPassword' ],
    //   دا لو عاوزه احمي الكارت و البرودكت ديتالز
    //   matcher: ['/cart', '/products/:path*'],
}