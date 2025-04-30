import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
// import { toast } from "sonner";
import InputError from "@/components/input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type CreateForm = {
  name: string;
  description: string | null;
  category_id: string;
  price: number | null;
  stock: number | null;
}

export function CreateProduct({ categories }: { categories: { [id: number]: string}}) {
  const [open, setOpen] = useState(false);

  const { data, setData, post, errors, clearErrors, processing, reset } = useForm<Required<CreateForm>>({
      name: '',
      description: '',
      category_id: '',
      price: null,
      stock: null,
  });

  const submit: FormEventHandler = (e) => {
      e.preventDefault();

      post(route('products.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Produto criado com sucesso');
          setOpen(false)
          reset();
        }
      });
  };

  const handleInputChange = (field: keyof CreateForm, value: string | number | null) => {
    setData(field, value);
    clearErrors(field);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Novo Produto
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Produto</DialogTitle>
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

            <InputError className="col-span-3 col-start-2" message={errors.price} />
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
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
