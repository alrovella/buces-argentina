import { Suspense } from "react";
import { getProductsByCategoryId } from "@/actions/products";
import type { Metadata } from "next";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import ProductList from "@/components/products/ProductList";
import type { ExtendedProduct } from "@/types/product";
import { getCategoryById } from "@/actions/categories";
import { notFound } from "next/navigation";
import CategoriesSelect from "@/components/layout/CategoriesSelect";
import CardListSkeleton from "@/components/shared/CardListSkeleton";
import { Flex } from "@repo/ui/components/ui/flex";

export const generateMetadata = async ({
	params,
}: PageProps): Promise<Metadata> => {
	const category = await getCategoryById(Number(params.categoryId));
	if (!category) return { title: process.env.APP_SEO_TITLE };
	return {
		title: `Comprar ${category?.name}`,
		description: category?.description,
	};
};

type PageProps = {
	params: { categoryId: string; categoryName: string };
};

const Page = async ({ params }: PageProps) => {
	const category = await getCategoryById(Number(params.categoryId));
	if (!category) notFound();

	const products = (await getProductsByCategoryId(
		Number(params.categoryId),
	)) as ExtendedProduct[];

	return (
		<>
			<Flex className="justify-between mb-2">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Inicio</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>{category?.name}</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<CategoriesSelect categoryName={category?.name} />
			</Flex>
			<Suspense fallback={<CardListSkeleton />}>
				<ProductList products={products} />
			</Suspense>
		</>
	);
};

export default Page;
