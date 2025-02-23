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

type DeleteCategoryDialogProps = {
  categoryID: string;
  refetch: () => void
};

export const DeleteCategoryDialog = ({ categoryID, refetch: refetchCategory }: DeleteCategoryDialogProps) => {
  const { toast } = useToast()

  const { mutate: deleteCategory } = api.category.delete.useMutation({
    onSuccess: () => {
      sonner.success("Category deleted successfully");
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

  const handleDeleteCategory = () => {
    deleteCategory({ id: categoryID })
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
          <AlertDialogAction onClick={handleDeleteCategory}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
