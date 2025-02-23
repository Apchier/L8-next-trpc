"use client"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { toast as sonner } from "sonner"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type { UpdateProductFormSchema } from "../types"
import { updateProductFormSchema } from "../schemas"
import { EditProductFormInner } from "./EditProductFormInner"

type EditProductFormProps ={
    id: string
}

export const EditProductForm = ({id}: EditProductFormProps) => {
    const { toast } = useToast()
    const router = useRouter()
    const utils = api.useUtils()

    const form = useForm<UpdateProductFormSchema>({
        defaultValues: {
            name: "",
            price: "",
            image: "",
            description: "",
            category_id: ""
        },
        resolver: zodResolver(updateProductFormSchema),
    })

    const { data: product } = api.product.getById.useQuery({ id })

    const { mutate: updateProduct } = api.product.update.useMutation({
        onSuccess: () => {
            sonner.success("Product updated successfully")
            void utils.product.getAll.invalidate()
            router.push('/product')
        },
        onError: () => {
            toast({
                title: "NOT FOUND",
                description: "Something went wrong",
                variant: "destructive",
            })
        }
    })

    const onSubmit = (values: UpdateProductFormSchema) => {
        updateProduct({ id, request: values })
    }

    useEffect(() => {
        if (product) {
            form.reset({
                ...product,
                image: product.image ?? "",
                description: product.description ?? "",
            })
        }
    }, [form, product, id])

    return (
        <Form {...form}>
            <EditProductFormInner formId="edit-product-form" onSubmit={onSubmit} />
        </Form>
    )
}