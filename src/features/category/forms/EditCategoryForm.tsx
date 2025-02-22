"use client"
import { Form } from "@/components/ui/form"
import { EditCategoryFormInner } from "./EditCategoryFormInner"
import { useForm } from "react-hook-form"
import { toast as sonner } from "sonner"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateCategoryFormSchema } from "../schemas"
import type { UpdateCategoryFormSchema } from "../types"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

type EditCategoryFormProps ={
    id: string
}

export const EditCategoryForm = ({id}: EditCategoryFormProps) => {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<UpdateCategoryFormSchema>({
        defaultValues: {
            name: ""
        },
        resolver: zodResolver(updateCategoryFormSchema),
    })

    const { data: category } = api.category.getById.useQuery({ id })

    const { mutate: updateCategory } = api.category.update.useMutation({
        onSuccess: () => {
            sonner.success("Category updated successfully");
            router.push('/category')
        },
        onError: () => {
            toast({
                title: "NOT FOUND",
                description: "Something went wrong",
                variant: "destructive",
            })
        }
    })

    const onSubmit = (values: UpdateCategoryFormSchema) => {
        updateCategory({ id, request: values })
    }

    useEffect(() => {
        if (category) {
            form.reset({ name: category.name })
        }
    }, [form, category, id])

    return (
        <Form {...form}>
            <EditCategoryFormInner formId="edit-category-form" onSubmit={onSubmit} />
        </Form>
    )
}