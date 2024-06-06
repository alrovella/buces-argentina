"use server";

import db from "@repo/database/client";

export async function getDiscountCouponById(id: number) {
	const coupon = await db.discountCoupon.findUnique({
		where: { id },
	});
	return coupon;
}

export async function getDiscountCouponByCode(code: string) {
	const coupon = await db.discountCoupon.findUnique({
		where: { code, validUntil: { gte: new Date() } },
	});
	return coupon;
}
