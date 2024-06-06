import { getAllProducts } from "@/actions/products";
import CardListSkeleton from "@/components/shared/CardListSkeleton";
import ProductList from "@/components/products/ProductList";
import { LABELS } from "@/shared/labels";
import type { ExtendedProduct } from "@/types/product";
import { Suspense } from "react";

const NotFound = async () => {
	const products = (await getAllProducts(true)) as ExtendedProduct[];

	return (
		<>
			<div className="flex justify-center items-center gap-2 mb-2">
				<h1 className="font-bold text-lg">404</h1>
				<p>{LABELS.CATEGORY.NOT_FOUND}</p>
			</div>

			<Suspense fallback={<CardListSkeleton />}>
				<ProductList products={products} />
			</Suspense>
		</>
	);
};

export default NotFound;
