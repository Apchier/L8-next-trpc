import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { PenIcon } from "lucide-react"
import { DeleteCategoryDialog } from "../components/action/DeleteCategoryDialog"
import Link from "next/link"
import type { CategoryWithValidation } from "../types"

type CategoryTableItemProps = {
    index: number
    category: CategoryWithValidation
    refetch: () => void
}

export const CategoryTableItem = ({ category, index, refetch: refetchCategory }: CategoryTableItemProps) => {
    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="w-full">{category.name}</TableCell>
            <TableCell className="flex gap-2">
                <Link href={`/category/${category.id}/edit`}>
                    <Button variant="outline">
                        <PenIcon />
                    </Button>
                </Link>
                <DeleteCategoryDialog categoryID={category.id} refetch={refetchCategory} />
            </TableCell>
        </TableRow>
    )
}

export const CategoryTableNotFoundItem = () => (
    <TableRow>
        <TableCell colSpan={4} className="text-center">
            No Categories
        </TableCell>
    </TableRow>
);