import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EditCategoryForm } from "../forms/EditCategoryForm"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionContainer } from "@/components/layouts/SectionContainer"

type EditCategoryPageProps = {
    params: Promise<{ id: string }>
}

export const EditCategoryPage = async ({ params }: EditCategoryPageProps) => {
    const id = (await params).id
    return (
        <PageContainer withHeader withFooter>
            <SectionContainer
                padded
                withBackground
                className="min-h-screen gap-y-10 pt-10"
            >
                <div className="w-full min-h-screen mx-auto p-4">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Edit Category</CardTitle>
                            <CardDescription>
                                Edit new category name
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <EditCategoryForm id={id} />
                        </CardContent>
                    </Card>
                </div>
            </SectionContainer>
        </PageContainer >
    )
}