"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useEffect } from "react";

const ClearCart = () => {
	const { clearCart } = useCartStore();

	useEffect(() => {
		clearCart();
	}, [clearCart]);

	return <></>;
};
export default ClearCart;
