
export async function getAllProducts() {
    try {
        
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
        method: "Get",
        // headers: {},

        // cache :"force-cache" // SSG ==> بيخزن صفحه ال اتش تي ام ال والداتا كمان 
        // cache: "no-store", // SSR ==> كل مره بعمل ريكوست جديد بقوله يجبلي الداتا الجديده 
        // next: { revalidate: 60 } //ISR ==> مش هيعمل ريكوست جديد غير بعد المده اللي محددها حتي لو انا طلبته هيجيب اللي مخزنه ف الكاش 
    });

    if (!res.ok) {
        const { message } = await res.json()

        throw new Error(message)

        // throw ==> هتعمل تلت حاجات هتمسك الايرور وتوقف الفنكشن وتبعت الايرور 

        // Error() ==> object in js built in
        // {
        //     name : "Error", // ثابت
        //     message : " Route can't be found"
        // }
    }

    const { data } = await res.json();
    return data;
    } catch (error) {
        console.log(error);
    }

}


// cache in next
/*
CSR ==> client side rendering ==> الكومبوننت بيحصله ريندر علي السيرفر ولكن بيرجع صفحه ال html , js
SSR ==> server side rendering ==> الكومبوننت بيحصله ريندر علي السيرفر وبيرجع صفحه ال html بس 

SSR ==> static site generation ==> ممكن نعمل فيها الصفحات الثابته وممكن نعمل فيها call for API بس بشرط ميكنش عاوز اوثنتكيشن يعني محتاج مثلاا Token 
// ==> لما اليوذر بيطلبها بنبعتها علطول مش بنعملها ريندر علي السيرفر

ISR ==> incremental static regeneration ==> برضو بتتجهز علي السيرفر ولما بيعوزها بتيجي من غير ما تعمل ريندير 
// ولكن بتعمل revalidate  :60 ==> دا يعني انه هيعمل generation بعد مده معينه انا اللي بحددها

*/