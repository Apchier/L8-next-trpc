"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { CreateCategoryForm } from "../../forms/CreateCategoryForm"

type CreateCategoryDialogProps = {
    refetch: () => void
}

export const CreateCategoryDialog = ({ refetch: refetchCategory }: CreateCategoryDialogProps) => {
    const [isOpen, setisOpen] = useState<boolean>(false)

    return (
        <Dialog open={isOpen} onOpenChange={setisOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Add Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <CreateCategoryForm formId="create-category-form" refetch={refetchCategory} setIsOpen={setisOpen}/>
            </DialogContent>
        </Dialog>
    )
}
