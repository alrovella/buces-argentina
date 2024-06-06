"use client";

import { cn, formatPrice } from "@/shared/utils";
import slugify from "slugify";
import type { CartProduct, ExtendedProduct } from "@/types/product";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
	Card,
	CardHeader,
	CardDescription,
	CardTitle,
	CardFooter,
} from "@repo/ui/components/ui/card";
import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { LABELS } from "@/shared/labels";
import BlurImage from "../shared/BlurImage";

const ProductCard = ({ product }: { product: ExtendedProduct }) => {
	const { addProduct } = useCartStore();
	const router = useRouter();

	const handleClick = () => {
		if (product) {
			const cartProduct = {
				id: product.id,
				name: product.name,
				price: product.price,
				quantity: 1,
				total: product.price,
			} as CartProduct;

			addProduct(cartProduct);

			router.push("/carrito");
		}
	};
	return (
		<div>
			<Card>
				<CardHeader className="px-2 py-2">
					<CardDescription>{product.category.name}</CardDescription>
					<CardTitle>{product.name}</CardTitle>
				</CardHeader>
				<Link
					href={`/productos/${product.id}/${slugify(product.name)}`}
					className="relative"
				>
					<BlurImage
						width={250}
						height={250}
						quality={75}
						src={product?.images[0].url}
						alt={product.name}
						className="w-full h-48 object-cover"
					/>
					{product.isNew && (
						<Badge
							variant="secondary"
							className="top-2 right-2 absolute bg-orange-600 hover:bg-orange-600 shadow-md text-white hover:text-white"
						>
							{LABELS.PRODUCT.NEW}
						</Badge>
					)}
				</Link>
				<CardFooter className="flex justify-between items-center mt-1 px-2 py-1">
					<span
						className={cn(
							"text-md font-semibold text-primary",
							product.inStock
								? "text-primary text-xl font-bold"
								: "destructive",
						)}
					>
						{product.inStock ? (
							<span>{formatPrice(product.price)}</span>
						) : (
							<span>{LABELS.PRODUCT.SOLD_OUT}</span>
						)}
					</span>
					<Tooltip delayDuration={1}>
						<TooltipTrigger asChild>
							<Button
								variant="default"
								size="icon"
								disabled={!product.inStock}
								onClick={handleClick}
							>
								<ShoppingCartIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top">
							{LABELS.CART.ADD_TO_CART}
						</TooltipContent>
					</Tooltip>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ProductCard;
