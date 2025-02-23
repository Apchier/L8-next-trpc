import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { PenIcon } from "lucide-react"
import Link from "next/link"
import type { ProductWithCategory } from "../types"
import { DeleteProductDialog } from "../components/action/DeleteTodoDialog"
import { convertCurrency } from "@/utils/convert-currency"

type ProductTableItemProps = {
    index: number
    product: ProductWithCategory
    refetch: () => void
}


export const ProductTableItem = ({ product, index, refetch: refetchProduct }: ProductTableItemProps ) => {
    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>
                {convertCurrency(product.price)}
            </TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell className="flex gap-2 justify-center items-center">
                <Link href={`/product/${product.id}/edit`}>
                    <Button variant="outline">
                        <PenIcon />
                    </Button>
                </Link>
                <DeleteProductDialog productID={product.id} refetch={refetchProduct} />
            </TableCell>
        </TableRow>
    )
}

export const ProductTableNotFoundItem = () => (
    <TableRow>
        <TableCell colSpan={6} className="text-center">
            No Products
        </TableCell>
    </TableRow>
);