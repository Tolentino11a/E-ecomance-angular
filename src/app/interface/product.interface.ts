/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Category{
    id: string,
    name: string,
    typeImg: string
}
export interface Product{
    id: string,
    title: string,
    price: number,
    images: string[],
    description: string,
    category: Category,
    taxes?: number
}

export interface CreateProduct extends Omit <Product,'id'|'category'> {
    categoryId: number
}
export interface UpdateProduct extends Partial<CreateProduct> {
}