import type { CartStore } from "@/types/cart";
import type { CartProduct } from "@/types/product";
import type { DiscountCoupon, User } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(
	persist<CartStore>(
		(set, get) => ({
			user: {} as User,
			discountCoupon: undefined,
			discountAmount: 0,
			shippingCost: 0,
			products: [],
			setUser: (info: User) => {
				console.log(info.provinceId);
				set((state) => {
					state.user = info;
					return {
						user: state.user,
					};
				});
			},
			clearCart: () => {
				set((state) => {
					state.products = [];
					state.discountCoupon = undefined;
					state.shippingCost = 0;
					return {
						products: state.products,
						discountCoupon: state.discountCoupon,
						shippingCost: state.shippingCost,
					};
				});
			},
			addProduct: (product: CartProduct) => {
				set((state) => {
					const existingProduct = state.products.find(
						(i) => i.id === product.id,
					);

					if (existingProduct) {
						existingProduct.quantity += product.quantity;
						existingProduct.total =
							existingProduct.price * existingProduct.quantity;
					} else {
						product.total = product.price * product.quantity;
						state.products.push(product);
					}

					return {
						products: state.products,
					};
				});
			},
			removeProduct: (id: number) => {
				set((state) => {
					const product = state.products.find((i) => i.id === id);

					if (product) {
						state.products = state.products.filter((i) => i.id !== id);
					}

					if (state.products.length === 0) {
						state.clearCart();
					}

					return {
						products: state.products,
					};
				});
			},
			updateProduct: (id: number, quantity: number) => {
				set((state) => {
					const product = state.products.find((i) => i.id === id);

					if (product) {
						if (quantity === 0 || Number.isNaN(quantity)) {
							state.products = state.products.filter((i) => i.id !== id);
						} else {
							product.quantity = quantity;
							product.total = product.price * product.quantity;
						}
					}

					return {
						products: state.products,
					};
				});
			},
			setShippingCost: (cost: number) => {
				set((state) => {
					state.shippingCost = cost;
					return {
						shippingCost: state.shippingCost,
					};
				});
			},
			setDiscountCoupon: (discountCoupon?: DiscountCoupon) => {
				set((state) => {
					state.discountCoupon = discountCoupon;
					return {
						discountCoupon: state.discountCoupon,
					};
				});
			},
			getDiscountAmount: () => {
				const { products, discountCoupon, getSubTotal } = get();
				console.log(discountCoupon);

				console.log(getSubTotal());
				return discountCoupon
					? getSubTotal() * (discountCoupon.discount / 100)
					: 0;
			},
			getSubTotal: () => {
				const { products } = get();
				const subTotal = products.reduce((acc, product) => {
					return acc + product.total;
				}, 0);
				return subTotal;
			},
			getTotal: (shippingCostIncluded: boolean) => {
				const { products, shippingCost, getDiscountAmount } = get();
				const total = products.reduce((acc, product) => {
					return acc + product.total;
				}, 0);
				return (
					total +
					(shippingCostIncluded ? shippingCost : 0) -
					getDiscountAmount()
				);
			},
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
