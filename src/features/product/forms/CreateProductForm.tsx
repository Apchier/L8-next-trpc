"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast as sonner } from "sonner";
import { api } from "@/trpc/client";
import { useToast } from "@/hooks/use-toast";
import { CreateProductFormInner } from "./CreateProductFormInner";
import type { CreateProductFormSchema } from "../types";
import { createProductFormSchema } from "../schemas";

type CreateProductFormProps = {
    refetch: () => void
    setIsOpen: (isOpen: boolean) => void
}

export const CreateProductForm = ({ setIsOpen ,refetch: refetchProduct }: CreateProductFormProps) => {
    const { toast } = useToast()
    const form = useForm<CreateProductFormSchema>({
        defaultValues: {
            name: "",
            price: "",
            image: "",
            description: "",
            category_id: ""
        },
        resolver: zodResolver(createProductFormSchema),
    });

    const { mutate: createProduct } = api.product.create.useMutation({
        onSuccess: () => {
            sonner.success("Product created successfully");
            refetchProduct()
            setIsOpen(false)
        },
        onError: () => {
            toast({
                title: "NOT FOUND",
                variant: "destructive",
                description: "Something went wrong",
            })
        }
    })

    const onSubmit = (values: CreateProductFormSchema) => createProduct({request: values})

    return (
        <Form {...form}>
            <CreateProductFormInner onSubmit={onSubmit} />
        </Form>
    )
}
