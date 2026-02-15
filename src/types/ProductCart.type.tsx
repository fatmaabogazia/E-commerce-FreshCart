export interface ProductCartType {
    count: number
    price: number
    product: Product
    _id: string
}

export interface Product {
    brand: Brand
    category: Category
    id: string
    imageCover: string
    quantity: number
    ratingsAverage: number
    subcategory: Subcategory[]
    title: string
    _id: string
}

export interface Brand {
    image: string
    name: string
    slug: string
    _id: string
}

export interface Category {
    image: string
    name: string
    slug: string
    _id: string
}

export interface Subcategory {
    category: string
    name: string
    slug: string
    _id: string
}
