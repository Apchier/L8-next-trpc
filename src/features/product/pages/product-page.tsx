"use client"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionContainer } from "@/components/layouts/SectionContainer"
import { ProductTable } from "../tables/ProductTable"
import { api } from "@/trpc/client"
import { CreateProductDialog } from "../components/action/CreateCategoryDialog"

export const ProductPage = () => {
    const {data: products, isLoading: isProductLoading, refetch: refetchProduct} = api.product.getAll.useQuery()
    console.log(products)

    return (
        <PageContainer withHeader withFooter>
            <SectionContainer
                padded
                withBackground
                className="min-h-screen gap-y-10 pt-10"
            >
                {/* Product Form */}
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-2xl font-bold italic">Product Table Page</h1>
                    <CreateProductDialog refetch={refetchProduct} />
                </div>
                {/* Product Table */}
                <ProductTable  products={products} isLoading={isProductLoading} refetch={refetchProduct}/>
            </SectionContainer>
        </PageContainer>
    )
}