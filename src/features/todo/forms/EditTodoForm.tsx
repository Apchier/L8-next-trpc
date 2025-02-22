"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { UpdateTodoFormSchema } from "../types"
import { updateTodoFormSchema } from "../schemas"
import { useEffect } from "react"
import { api } from "@/trpc/client"
import { toast as sonner } from "sonner"
import { useToast } from "@/hooks/use-toast"

type EditTodoFormProps = {
    id: string
    refetch: () => void
    setIsOpen: (isOpen: boolean) => void
}

export const EditTodoForm = ({ id, refetch: refetchTodos, setIsOpen }: EditTodoFormProps) => {
    const { toast } = useToast()
    const form = useForm<UpdateTodoFormSchema>({
        defaultValues: {
            text: ""
        },
        resolver: zodResolver(updateTodoFormSchema),
    })

    const { data: todo } = api.todo.getById.useQuery({ id })

    const { mutate: updateTodo } = api.todo.update.useMutation({
        onSuccess: () => {
            sonner.success("Todo deleted successfully");
            refetchTodos()
            setIsOpen(false)
        },
        onError: () => {
            toast({
                title: "NOT FOUND",
                description: "Something went wrong",
                variant: "destructive",
            })
        }
    })

    const onSubmit = (values: UpdateTodoFormSchema) => {
        updateTodo({ id, request: values })
    }

    useEffect(() => {
        if (todo) {
            form.reset({ text: todo.text })
        }
    }, [form, todo, id])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Todo</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
