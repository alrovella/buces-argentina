import CardSkeleton from "@/components/shared/CardSkeleton";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCategoryById } from "@/actions/categories";
import CategoryForm from "@/components/dashboard/categories/Form";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";

export default async function Page({
	params,
}: Readonly<{
	params?: {
		id?: string;
	};
}>) {
	if (!params?.id) notFound();
	const category = await getCategoryById(Number(params?.id));
	if (!category) notFound();
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>Categorías</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>Editar Categoría</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Suspense fallback={<CardSkeleton />}>
				<CategoryForm category={category} />
			</Suspense>
		</>
	);
}
