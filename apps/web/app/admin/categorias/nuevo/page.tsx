import CardSkeleton from "@/components/shared/CardSkeleton";
import { Suspense } from "react";
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
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>Categorías</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>Nueva Categoría</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Suspense fallback={<CardSkeleton />}>
				<CategoryForm />
			</Suspense>
		</>
	);
}
