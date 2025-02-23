"use client"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import type { CreateProductFormSchema, UpdateProductFormSchema } from "../types"
import { CategorySelect } from "../components/CategorySelect"
import { Textarea } from "@/components/ui/textarea"
import { inputHandle } from "@/utils/form-input"

type EditProductFormInnerProps = {
    formId: string
    onSubmit: (values: UpdateProductFormSchema) => void
}

export const EditProductFormInner = ({ formId, onSubmit }: EditProductFormInnerProps) => {
    const form = useFormContext<UpdateProductFormSchema>()

    return (
        <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product</FormLabel>
                        <FormControl>
                            <Input placeholder="Input your Product here" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <CategorySelect<CreateProductFormSchema> name="category_id" label="Category" />
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Input your Product here" {...field}
                                onChange={(e) => {
                                    inputHandle("onChange", "number", e)
                                    field.onChange(e)
                                }}
                                onPaste={(e) => {
                                    inputHandle("onPaste", "number", e)
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <Input placeholder="Input your Product here" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" variant={"outline"} className="w-[100px] flex self-end px-10">Update</Button>
        </form>
    )
}