"use server";

import db from "@repo/database/client";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAllProvinces = async () => {
	const data = await db.province.findMany({
		orderBy: { name: "asc" },
	});
	return data;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const updateShippingCosts = async (state: any, data: FormData) => {
	const loggedUser = await currentUser();
	if (!loggedUser) return redirect("/sign-in");

	const provinceIds = data.getAll("id") as string[];
	const shippingCosts = data.getAll("shippingCost") as string[];

	provinceIds.forEach(async (provinceId, index) => {
		await db.province.update({
			where: { id: Number(provinceId) },
			data: { shippingCost: Number(shippingCosts[index]) },
		});
	});

	revalidatePath("/admin/costos-envio");
	redirect("/");
};
