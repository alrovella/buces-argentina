"use client";

import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { useRouter } from "next/navigation";
import type { CartProduct, ExtendedProduct } from "@/types/product";

const BuyButton = ({ product }: { product: ExtendedProduct }) => {
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const { addProduct } = useCartStore();
	const router = useRouter();

	const handleClick = () => {
		if (product) {
			setButtonDisabled(true);
			const cartProduct = {
				id: product.id,
				name: product.name,
				price: product.price,
				quantity: 1,
				total: product.price,
			} as CartProduct;
			addProduct(cartProduct);
			setButtonDisabled(false);
			router.push("/carrito");
		}
	};

	return (
		<Button
			onClick={handleClick}
			disabled={!product.inStock || buttonDisabled}
			variant="default"
			size="sm"
			className="flex justify-between items-center gap-2"
		>
			<ShoppingCartIcon />
			Comprar
		</Button>
	);
};

export default BuyButton;
