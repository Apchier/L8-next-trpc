"use client"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionContainer } from "@/components/layouts/SectionContainer"

export const ProductPage = () => {
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
                </div>
                {/* Product Table */}
            </SectionContainer>
        </PageContainer>
    )
}