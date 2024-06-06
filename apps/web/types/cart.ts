import type { CartProduct } from "./product";
import type { DiscountCoupon, User } from "@/prisma/client";
export type CartStore = {
	shippingCost: number;
	discountCoupon?: DiscountCoupon;
	products: CartProduct[];
	user: User;
	clearCart: () => void;
	addProduct: (product: CartProduct) => void;
	removeProduct: (id: number) => void;
	updateProduct: (id: number, quantity: number) => void;
	setDiscountCoupon: (discountCoupon?: DiscountCoupon) => void;
	setShippingCost: (cost: number) => void;
	getTotal: (shippingCostIncluded: boolean) => number;
	getDiscountAmount: () => number;
	getSubTotal: () => number;
	setUser: (info: User) => void;
};
