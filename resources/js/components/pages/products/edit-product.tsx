import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import InputError from "@/components/input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EditForm = {
  name: string;
  description: string | null;
  category_id: string;
  price: number | null;
  stock: number | null;
}

export function EditProduct({ product, categories }: { product: Product, categories: { [id: number]: string } }) {
  const [open, setOpen] = useState(false);

  const { data, setData, patch, errors, clearErrors, processing , reset} = useForm<Required<EditForm>>({
    name: product.name,
    description: product.description,
    category_id: product.category_id.toString(),
    price: product.price,
    stock: product.stock,
  });

  const submit: FormEventHandler = (e) => {
    console.log('submit', data);
    e.preventDefault();

    patch(route('products.update', product.id), {
      preserveScroll: true,
      onSuccess: () => {
        console.log('Produto atualizado com sucesso');
        toast.success('Produto atualizado com sucesso');
        setOpen(false)
        reset();
      }
    });
  };

  const handleInputChange = (field: keyof EditForm, value: string | number | null) => {
    setData(field, value);
    clearErrors(field);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Editar</span>
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
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              className="w-full col-span-3"
              value={data.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              autoComplete="name"
              placeholder="Nome"
            />

            <InputError className="col-span-3 col-start-2" message={errors.name} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category_id" className="text-right">
              Categoria
            </Label>

            <Select value={data.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
              <SelectTrigger className="col-span-3 w-full">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {Object.entries(categories)?.map(([id, name]) => (
                  <SelectItem key={id} value={id.toString()}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <InputError className="col-span-3 col-start-2" message={errors.category_id} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input
              id="price"
              type="number"
              className="w-full col-span-3"
              value={data.price?.toString()}
              onChange={(e) => handleInputChange('price', Number(e.target.value))}
              required
              autoComplete="price"
              placeholder="Preço"
            />

            <InputError className="col-span-3 col-start-2" message={errors.price} />
          </div>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={data.description ?? ''}
              className="col-span-3"
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <InputError className="col-span-3 col-start-2" message={errors.description} />
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
