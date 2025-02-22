"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { CreateCategoryFormSchema } from "../types"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"

type CreateCategoryFormInnerProps = {
    formId: string
    onSubmit: (values: CreateCategoryFormSchema) => void
}

export const CreateCategoryFormInner = ({ formId, onSubmit }: CreateCategoryFormInnerProps) => {
    const form = useFormContext<CreateCategoryFormSchema>()
    return (
        <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                            <Input placeholder="Input your category here" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" className="w-[100px] flex self-end">Submit</Button>
        </form>
    )
}