
export interface WishlistType {
    brand: Brand
    category: Category
    createdAt: string
    description: string
    id: string
    imageCover: string
    images: string[]
    price: number
    quantity: number
    ratingsAverage: number
    ratingsQuantity: number
    slug: string
    sold: number
    subcategory: Subcategory[]
    title: string
    updatedAt: string
    __v: number
    _id: string
}

export interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}

export interface Category {
    _id: string
    name: string
    slug: string
    image: string
}

export interface Subcategory {
    category: string
    name: string
    slug: string
    _id: string
}