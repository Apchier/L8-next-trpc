"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { CreateProductFormSchema } from "../types"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { CategorySelect } from "../components/CategorySelect"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { inputHandle } from "@/utils/form-input"

type CreateProductFormInnerProps = {
    onSubmit: (values: CreateProductFormSchema) => void
}

export const CreateProductFormInner = ({ onSubmit }: CreateProductFormInnerProps) => {
    const form = useFormContext<CreateProductFormSchema>()
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
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
            <Button type="submit" className="w-[100px] flex self-end px-10">Submit</Button>
        </form>
    )
}