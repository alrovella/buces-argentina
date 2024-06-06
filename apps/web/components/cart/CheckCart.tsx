"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckCart = () => {
	const router = useRouter();
	const products = useCartStore((state) => state.products);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (products.length === 0) {
				router.push("/");
			}
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [products, router]);

	return <></>;
};
export default CheckCart;
