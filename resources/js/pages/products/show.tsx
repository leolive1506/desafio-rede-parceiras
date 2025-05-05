import { Badge } from "@/components/ui/badge/index";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Clock, Package, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatPrice } from "@/lib/utils";

interface ProductDetailProps {
  product: Product,
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Products',
      href: route('products.index'),
    },
    {
      title: product.name,
      href: route('products.show', product.sku)
    }
  ];

  const handleStockStatus = (stock: number) => {
    if (stock > 20) {
      return {
        status: "Em estoque", color: "bg-green-500"
      }
    }

    if (stock > 0) {
      return {
        status: "Estoque baixo",
        color: "bg-amber-500"
      }
    }

    return {
      status: "Sem estoque",
      color: "bg-red-500"
    }
  }

  const stockStatus = handleStockStatus(product.stock)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9" asChild>
              <Link href={route('products.index')}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{product.name}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações do Produto</CardTitle>
              <CardDescription>Detalhes e especificações do produto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-medium">Descrição</h3>
                  <p className="text-muted-foreground mt-2">{product.description || "Sem descrição disponível."}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">SKU</h3>
                    <p className="flex items-center mt-1">
                      <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                      {product.sku}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Categoria</h3>
                    <p className="flex items-center mt-1">
                      <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                      {product.category.name}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Criado em</h3>
                    <p className="flex items-center mt-1">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {formatDate(product.created_at)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Atualizado em</h3>
                    <p className="flex items-center mt-1">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {formatDate(product.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preço e Estoque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Status</p>
                    <Badge className={`${stockStatus.color} hover:${stockStatus.color}`}>{stockStatus.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-medium">Quantidade</p>
                    <p>{product.stock} unidades</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
