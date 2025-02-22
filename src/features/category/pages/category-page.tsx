"use client"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionContainer } from "@/components/layouts/SectionContainer"
import { CategoryTable } from "../tables/CategoryTable"
import { api } from "@/trpc/client"
import { CreateCategoryDialog } from "../components/action/CreateCategoryDialog"

export const CategoryPage = () => {
    const { data: categories, isLoading: isCategoryLoading, refetch: refetchCategory } = api.category.getAll.useQuery()
    console.log(categories)
    return (
        <PageContainer withHeader withFooter>
            <SectionContainer
                padded
                withBackground
                className="min-h-screen gap-y-10 pt-10"
            >
                {/* Category Form */}
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-2xl font-bold italic">Category Table Page</h1>
                    <CreateCategoryDialog refetch={refetchCategory} />
                </div>
                {/* Category Table */}
                <CategoryTable categories={categories} isLoading={isCategoryLoading} refetch={refetchCategory} />
            </SectionContainer>
        </PageContainer>
    )
}