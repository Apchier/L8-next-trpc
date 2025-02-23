import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { toast as sonner } from "sonner";
import { api } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type DeleteProductDialogProps = {
  productID: string;
  refetch: () => void
};

export const DeleteProductDialog = ({ productID, refetch: refetchCategory }: DeleteProductDialogProps) => {
  const { toast } = useToast()

  const { mutate: deleteProduct } = api.product.delete.useMutation({
    onSuccess: () => {
      sonner.success("Todo deleted successfully");
      refetchCategory()
    },
    onError: () => {
      toast({
        title: "NOT FOUND",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  })

  const handleDeleteProduct = () => {
    deleteProduct({ id: productID })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProduct}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
