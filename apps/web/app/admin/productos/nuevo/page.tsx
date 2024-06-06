import CardSkeleton from "@/components/shared/CardSkeleton";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductForm from "@/components/dashboard/products/ProductForm";
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

export default async function Page({
	params,
}: Readonly<{
	params?: {
		id?: string;
	};
}>) {
	const categories = await getAllCategories();
	if (!categories) notFound();
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbLink href="/admin/productos">Productos</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>Nuevo Producto</BreadcrumbItem>
					<BreadcrumbSeparator />
				</BreadcrumbList>
			</Breadcrumb>
			<Suspense fallback={<CardSkeleton />}>
				<Tabs defaultValue="info" className="w-full sm:w-1/2">
					<TabsList className="grid grid-cols-2 w-full">
						<TabsTrigger value="info">Información del Producto</TabsTrigger>
					</TabsList>
					<TabsContent value="info">
						<ProductForm categories={categories} />
					</TabsContent>
				</Tabs>
			</Suspense>
		</>
	);
}
