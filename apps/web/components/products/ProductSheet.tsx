"use client";

import type { ExtendedProduct } from "@/types/product";
import { Badge } from "@repo/ui/components/ui/badge";
import Carousel from "./Carousel";
import ProductBreadcrumb from "./ProductBreadcrumb";
import BuyButton from "./BuyButton";
import KeywordsLink from "./KeywordsLink";
import Link from "next/link";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { cn, formatPrice } from "@/shared/utils";
import { LABELS } from "@/shared/labels";

const ProductSheet = ({
	product,
	isAdmin,
}: {
	product: ExtendedProduct;
	isAdmin: boolean;
}) => {
	return (
		<>
			<ProductBreadcrumb product={product} />
			<div className="flex justify-between items-center">
				<h1 className="flex items-center gap-1 pb-2 font-bold text-2xl">
					{product.name}
					{isAdmin && (
						<Link
							className={cn(
								"flex items-center gap-1",
								buttonVariants({ variant: "link", size: "sm" }),
							)}
							href={`/admin/productos/editar/${product.id}`}
						>
							Editar Producto
						</Link>
					)}
				</h1>
				{product.isNew && (
					<Badge
						variant="secondary"
						className="bg-orange-600 hover:bg-orange-600 text-white hover:text-white animate-pulse duration-1000"
					>
						{LABELS.PRODUCT.NEW}
					</Badge>
				)}
			</div>

			<Carousel images={product.images.map((image) => image.url)} />
			<pre className="my-4 p-1 text-base text-pretty focus-visible:ring-0 font-sans overflow-hidden select-none resize-none">
				{product.description}
			</pre>

			<div className="flex justify-between items-center gap-2 border-0 border-foreground/5 shadow-md mt-4 p-0 sm:p-4 sm:border rounded-lg">
				{product.keywords && <KeywordsLink keywords={product.keywords} />}
				<div>
					{product.inStock ? (
						<>
							<h3 className="font-bold text-xl">
								{formatPrice(product.price)}
							</h3>
							<BuyButton product={product} />
						</>
					) : (
						<span className="font-semibold text-destructive text-md">
							{LABELS.PRODUCT.SOLD_OUT}
						</span>
					)}
				</div>
			</div>
		</>
	);
};

export default ProductSheet;
