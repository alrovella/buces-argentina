"use server";
import db from "@repo/database/client";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "./users";
import type { Purchase } from "@/types/purchase";

export const getPurchaseById = async (id: number) => {
	const { userId } = await auth();
	if (userId == null) return null;
	const user = await getUserByClerkId(userId);
	if (user == null) return null;
	const sale = await db.sale.findUnique({
		include: {
			saleItems: {
				include: { product: { include: { category: true } } },
			},
		},
		where: { id, userId: user.id },
	});
	return sale as Purchase;
};

export const getMyPurchases = async (page = 1, limit = 10) => {
	const { userId } = await auth();
	if (userId == null) return [];
	const user = await getUserByClerkId(userId);
	if (user == null) return null;

	const data = await db.sale.findMany({
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			createdAt: "desc",
		},
		where: { userId: user.id },
		include: {
			saleItems: {
				include: { product: { include: { category: true } } },
			},
		},
	});
	return data as Purchase[];
};
