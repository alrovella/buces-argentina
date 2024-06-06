import CardSkeleton from "@/components/shared/CardSkeleton";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductForm from "@/components/dashboard/products/ProductForm";
import { getProductById } from "@/actions/products";
import { getAllCategories } from "@/actions/categories";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
	BreadcrumbLink,
} from "@repo/ui/components/ui/breadcrumb";
import ProductImages from "@/components/dashboard/products/ProductImages";

export default async function Page({
	params,
	searchParams,
}: Readonly<{
	searchParams?: {
		tabSection?: string;
	};
	params?: {
		id?: string;
	};
}>) {
	if (!params?.id) notFound();
	const product = await getProductById(Number(params.id));
	if (!product) notFound();
	const categories = await getAllCategories();
	if (!categories || !product) notFound();
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbLink href="/admin/productos">Productos</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>Editar Producto</BreadcrumbItem>
					<BreadcrumbSeparator />
				</BreadcrumbList>
			</Breadcrumb>

			<Suspense fallback={<CardSkeleton />}>
				<Tabs
					defaultValue={searchParams?.tabSection ?? "info"}
					className="w-full sm:w-1/2"
				>
					<TabsList className="grid grid-cols-2 w-full">
						<TabsTrigger value="info">Información del Producto</TabsTrigger>
						<TabsTrigger value="images">
							Imagenes ({product.images.length})
						</TabsTrigger>
					</TabsList>
					<TabsContent value="info">
						<ProductForm product={product} categories={categories} />
					</TabsContent>
					<TabsContent value="images">
						<ProductImages product={product} />
					</TabsContent>
				</Tabs>
			</Suspense>
		</>
	);
}
