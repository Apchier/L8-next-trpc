"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { EditTodoForm } from "../../forms/EditTodoForm"
import { useState } from "react"
import { PenIcon } from "lucide-react"

type EditTodoDialogProps = {
    id: string
    refetch: () => void
}

export const EditTodoDIalog = ({ id, refetch: refetchTodos }: EditTodoDialogProps) => {
    const [isOpen, setisOpen ] = useState<boolean>(false)

    return (
        <Dialog open={isOpen} onOpenChange={setisOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PenIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription> 
                </DialogHeader>
                <EditTodoForm id={id} refetch={refetchTodos} setIsOpen={setisOpen}/>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
