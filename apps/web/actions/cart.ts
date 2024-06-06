"use server";

import type { CheckoutProduct } from "@/types/product";
import { currentUser } from "@clerk/nextjs/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";
import { updateLoggedUserInfo } from "./users";
import type { User } from "@prisma/client";

const client = new MercadoPagoConfig({
	accessToken: process.env.MP_ACCESS_TOKEN ?? "",
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const checkOut = async (state: any, data: FormData) => {
	const loggedUser = await currentUser();
	if (!loggedUser) return redirect("/sign-in");

	// cart items
	const productIds = data.getAll("productId");
	const productNames = data.getAll("productName");
	const quantities = data.getAll("quantity");
	const prices = data.getAll("price");
	const totals = data.getAll("total");

	// sale
	const discountPercentage = Number(data.get("discountPercentage") ?? 0);
	const discountCouponId = Number(data.get("discountCouponId") ?? undefined);
	const shippingCost = Number(data.get("shippingCost") ?? 0);

	// user
	const firstName = data.get("firstName");
	const lastName = data.get("lastName");
	const email = data.get("email");
	const phone = data.get("phone");
	const address = data.get("address");
	const city = data.get("city");
	const provinceId = data.get("provinceId");
	const zipCode = data.get("zipCode");
	const comments = data.get("comments");

	const user = await updateLoggedUserInfo({
		firstName,
		lastName,
		email,
		phone,
		address,
		city,
		provinceId: Number(provinceId),
		zipCode,
		comments,
	} as User);

	const products: CheckoutProduct[] = productNames.map((name, index) => ({
		id: String(productIds[index]),
		name: String(name),
		quantity: Number(quantities[index]),
		price: Number(prices[index]),
		total: Number(totals[index]),
	}));

	const metadata = {
		user_id: user.id,
		discount_coupon_id: discountCouponId,
		shipping_cost: shippingCost,
	};

	const items = products.map((product) => ({
		id: product.id,
		title: product.name,
		quantity: product.quantity,
		unit_price:
			discountPercentage > 0
				? product.price - (product.price * discountPercentage) / 100
				: product.price,
	}));

	const preference = await new Preference(client).create({
		body: {
			shipments: {
				cost: shippingCost,
				mode: "not_specified",
			},
			metadata,
			items,
			back_urls: {
				success: process.env.MP_URL_SUCCESS,
				failure: process.env.MP_URL_FAILURE,
			},
			auto_return: "approved",
		},
	});
	if (preference.init_point) redirect(preference.init_point);
};
