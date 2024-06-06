import { Suspense } from "react";
import ProductSheet from "@/components/products/ProductSheet";
import { getProductById } from "@/actions/products";
import { notFound } from "next/navigation";
import { isAdmin } from "@/actions/users";
import type { Metadata } from "next";
import ProductSheetSkeleton from "@/components/shared/ProductSheetSkeleton";

export const generateMetadata = async ({
	params,
}: PageProps): Promise<Metadata> => {
	const product = await getProductById(Number(params.productId));
	if (!product) return { title: process.env.APP_SEO_TITLE };
	return {
		title: `Comprar ${product?.category.name} ${product?.name}`,
		description: product?.description,
	};
};

type PageProps = {
	params: { productId: string; productName: string };
};

const Page = async ({ params }: PageProps) => {
	const product = await getProductById(Number(params.productId));

	if (!product) return notFound();

	const loggedUserAdmin = await isAdmin();

	return (
		<Suspense fallback={<ProductSheetSkeleton />}>
			<ProductSheet product={product} isAdmin={loggedUserAdmin} />
		</Suspense>
	);
};

export default Page;
