import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";
import { PackageCheck } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import InputError from "@/components/input-error";

type EditForm = {
  stock: number | null;
}

export function EditProductOperator({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  const { data, setData, put, errors, clearErrors, processing , setDefaults } = useForm<Required<EditForm>>({
    stock: product.stock,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('products.update-operator', product.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Produto atualizado com sucesso');
        setOpen(false)
        setDefaults({
          stock: product.stock,
        });
      }
    });
  };

  const handleInputChange = (field: keyof EditForm, value: number | null) => {
    setData(field, value);
    clearErrors(field);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PackageCheck className="h-4 w-4" />
          <span className="sr-only">Editar Quantidade</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Faça suas mudanças e clique em salve quando estiver pronto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Quantidade
            </Label>
            <Input
              id="stock"
              type="number"
              className="w-full col-span-3"
              value={data.stock?.toString()}
              onChange={(e) => handleInputChange('stock', Number(e.target.value))}
              required
              autoComplete="stock"
              placeholder="Quantidade disponível"
            />

            <InputError className="col-span-3 col-start-2" message={errors.stock} />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={submit}
            disabled={processing}
          >
            Salvar mudanças
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
