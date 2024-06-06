import { findProducts } from "@/actions/products";
import CardListSkeleton from "@/components/shared/CardListSkeleton";
import CategoriesSelect from "@/components/layout/CategoriesSelect";
import ProductList from "@/components/products/ProductList";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { LABELS } from "@/shared/labels";
import type { ExtendedProduct } from "@/types/product";
import { Suspense } from "react";

export default async function Page({
	searchParams,
}: Readonly<{
	searchParams?: {
		q?: string;
	};
}>) {
	const products = (await findProducts(
		searchParams?.q ?? "",
	)) as ExtendedProduct[];

	return (
		<>
			<div className="flex justify-between items-center mb-2">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>Inicio</BreadcrumbItem>
						<BreadcrumbSeparator />{" "}
						<BreadcrumbItem>{LABELS.PRODUCT.PLURAL}</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{LABELS.COMMON.SEARCHING}{" "}
							<span className="font-bold">{searchParams?.q}</span>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<CategoriesSelect />
			</div>
			<Suspense fallback={<CardListSkeleton />}>
				<ProductList products={products} />
			</Suspense>
		</>
	);
}
