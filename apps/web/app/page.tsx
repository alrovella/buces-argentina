import { getAllProducts } from "@/actions/products";
import CardListSkeleton from "@/components/shared/CardListSkeleton";
import CategoriesSelect from "@/components/layout/CategoriesSelect";
import ProductList from "@/components/products/ProductList";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import type { ExtendedProduct } from "@/types/product";
import { Suspense } from "react";

const Page = async () => {
	const products = (await getAllProducts(true)) as ExtendedProduct[];

	return (
		<>
			<div className="flex justify-between items-center mb-2">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>Inicio</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>{process.env.APP_NAME}</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<CategoriesSelect />
			</div>
			<Suspense fallback={<CardListSkeleton />}>
				<ProductList products={products} />
			</Suspense>
		</>
	);
};
export default Page;
