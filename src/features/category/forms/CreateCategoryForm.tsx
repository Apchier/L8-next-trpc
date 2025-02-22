"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast as sonner } from "sonner";
import { api } from "@/trpc/client";
import { useToast } from "@/hooks/use-toast";
import type { CreateCategoryFormSchema } from "../types";
import { createCategoryFormSchema } from "../schemas";
import { CreateCategoryFormInner } from "./CreateCategoryFormInner";

type CreateCategoryFormProps = {
    formId: string
    refetch: () => void
    setIsOpen: (isOpen: boolean) => void
}

export const CreateCategoryForm = ({ setIsOpen , formId ,refetch: refetchCategory }: CreateCategoryFormProps) => {
    const { toast } = useToast()
    const form = useForm<CreateCategoryFormSchema>({
        defaultValues: {
            name: "",
        },
        resolver: zodResolver(createCategoryFormSchema),
    });

    const { mutate: createCategory } = api.category.create.useMutation({
        onSuccess: () => {
            sonner.success("Category created successfully");
            refetchCategory()
            form.reset()
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

    const onSubmit = (values: CreateCategoryFormSchema) => createCategory(values)

    return (
        <Form {...form}>
            <CreateCategoryFormInner formId={formId} onSubmit={onSubmit} />
        </Form>
    )
}
