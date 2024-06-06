"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { useState } from "react";

const QuantityInput = ({
	productId,
	quantity,
}: {
	productId: number;
	quantity: number;
}) => {
	const [quantityValue, setQuantityValue] = useState(quantity);
	const { updateProduct } = useCartStore();

	return (
		<div className="flex items-center gap-1">
			<Button
				variant="ghost"
				size="sm"
				disabled={quantity === 1}
				onClick={() => {
					updateProduct(productId, quantity - 1);
					setQuantityValue(quantity - 1);
				}}
			>
				-
			</Button>
			<Input
				type="text"
				className="focus-visible:ring-0 w-12 text-center"
				readOnly
				value={quantityValue}
			/>
			<Button
				variant="ghost"
				size="sm"
				onClick={() => {
					updateProduct(productId, quantity + 1);
					setQuantityValue(quantity + 1);
				}}
			>
				+
			</Button>
		</div>
	);
};

export default QuantityInput;
