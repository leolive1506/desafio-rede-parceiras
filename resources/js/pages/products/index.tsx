import { DebounceInput } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Product, Paginate } from "@/types";
import { Button } from "@/components/ui/button";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Eye, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { CreateProduct } from "@/components/pages/products/create-product";
import { EditProduct } from "@/components/pages/products/edit-product";
import { DeleteProduct } from "@/components/pages/products/delete-product";
import { EditProductOperator } from "@/components/pages/products/edit-product-operator";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: route('products.index'),
    },
];

interface ProductsProps {
  products: Paginate<Product>,
  categories: { [id: number]: string},
  can: { create: boolean, update: boolean, delete: boolean, update_operator: boolean }
}

export default function Products({ products, categories, can }: ProductsProps) {
  const params = new URLSearchParams(window.location.search)

  const [page, setPage] = useState(products.current_page);
  const [search, setSearch] = useState(params.get('search') ?? '');
  const [category, setCategory] = useState(params.get('category') ?? 'all');

  const handleFetchTable = ({ page, category, search }: { page: number, category: string, search: string}) => {
    router.get(route('products.index'), { page, category: category === 'all' ? '' : category, search }, {
      preserveState: true,
      preserveScroll: true,
      only: ['products'],
    })
  }

  const handlePageChange = (page: number) => {
    setPage(page)
    handleFetchTable({
      page, search, category
    });
  }

  const handleSearchChange = (search: string) => {
    setSearch(search)

    handleFetchTable({
      page, search, category
    });
  }

  const handleCategoryChange = (category: string) => {
    setCategory(category)

    handleFetchTable({
      page, search, category
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between mt-4 px-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <DebounceInput
              placeholder="Buscar produtos..."
              className="pl-8"
              onDebouncedChange={handleSearchChange}
            />
          </div>

          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por categoria" />
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
        </div>

        {can.create && <CreateProduct categories={categories} />}
      </div>

      <div className="px-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nome</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="hidden md:table-cell">Descrição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Nenhum negócio encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                products.data.map((product) => (
                  <TableRow key={product.id || product.name}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="font-medium text-center">{product.stock}</TableCell>
                    <TableCell>
                      <Badge>
                       {categories[product.category_id]}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="line-clamp-1">{product.description ?? "-"}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/products/${product.id || 1}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Visualizar</span>
                          </Link>
                        </Button>
                        {can.update && (
                          <EditProduct
                            product={product}
                            categories={categories}
                          />
                        )}
                        {can.update_operator && (
                          <EditProductOperator
                            product={product}
                          />
                        )}
                        {can.delete && (
                          <DeleteProduct
                            product={product}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="px-4">
        <Pagination
          currentPage={products.current_page}
          totalPages={products.last_page}
          setCurrentPage={(page => handlePageChange(page))}
        />
      </div>
    </AppLayout>
  )
}
