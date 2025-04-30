import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { toast } from "sonner"

export function DeleteProduct({ product }: { product: Product}) {
  const handleDelete = () => {
    router.delete(route('products.destroy', product.id), {
      onSuccess: () => {
        toast.success('Produto deletado com sucesso')
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash className="h-4 w-4" color="#fb2c36 " />
          <span className="sr-only">Deletar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja deletar esse produto?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é irreversível. Deseja deletar o produto {product.name}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
