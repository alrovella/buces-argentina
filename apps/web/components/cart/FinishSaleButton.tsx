"use client";

import { cn } from "@/shared/utils";
import { Button } from "@repo/ui/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/hooks/useCartStore";
import { LABELS } from "@/shared/labels";

const FinishSaleButton = () => {
	const router = useRouter();
	const { products } = useCartStore();

	const handleRedirectToFinishSale = () => {
		router.push("/carrito/finalizar");
	};

	if (products.length === 0) return <></>;

	return (
		<div className="flex justify-end items-center">
			<Button
				onClick={handleRedirectToFinishSale}
				variant="default"
				className={cn("flex items-center gap-1 w-full sm:w-auto")}
			>
				<ShoppingCart className="w-4 h-4" />
				{LABELS.CART.FINISH_PURCHASE}
			</Button>
		</div>
	);
};
export default FinishSaleButton;
