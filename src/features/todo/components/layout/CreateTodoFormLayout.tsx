import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type CreateTodoFormLayoutProps = {
  formId: string;
  children: React.ReactNode;
  isPending: boolean;
};

export const CreateTodoFormLayout = ({
  formId,
  children,
  isPending,
}: CreateTodoFormLayoutProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Your Day</CardTitle>
        <CardDescription>Stay organized with your daily tasks</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="place-content-end">
        <Button form={formId} disabled={isPending} variant={"outline"} className="px-10">
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Adding...
            </>
          ) : (
            "Add"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
