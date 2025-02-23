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
import { CreateProductForm } from "../../forms/CreateProductForm"

type CreateProductDialogProps = {
    refetch: () => void
}

export const CreateProductDialog = ({ refetch: refetchProduct }: CreateProductDialogProps) => {
    const [isOpen, setisOpen] = useState<boolean>(false)

    return (
        <Dialog open={isOpen} onOpenChange={setisOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-10">
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[70%]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <CreateProductForm refetch={refetchProduct} setIsOpen={setisOpen}/>
            </DialogContent>
        </Dialog>
    )
}
