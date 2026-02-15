import NextAuth from "next-auth"
import { authOptions } from "../../../../../auth"

const handler = NextAuth(authOptions)

// not allowed delet or update
export { handler as GET, handler as POST }



// [...nextauth].js ==> ... ===> meaning that possible include about one file or tow or more route