"use server";

import db from "@repo/database/client";
import { categorySchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "./users";

export const getAllCategories = async (page = 1, limit = 10) => {
	const data = await db.category.findMany({
		orderBy: { id: "desc" },
		include: {
			products: true,
		},
		take: limit,
		skip: (page - 1) * limit,
	});
	return data;
};

export const getCategoryById = async (id: number) => {
	try {
		const category = await db.category.findUnique({
			where: { id },
			include: { products: true },
		});
		return category;
	} catch (error) {
		return null;
	}
};

export const deleteCategory = async (id: number) => {
	try {
		const admin = await isAdmin();
		if (!admin) throw new Error("Unauthorized");

		await db.category.delete({
			where: { id },
		});
		revalidatePath("/admin/categorias");
		redirect("/admin/categorias");
	} catch (error) {
		return null;
	}
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const addOrUpdateCategory = async (state: any, formData: FormData) => {
	const admin = await isAdmin();
	if (!admin) throw new Error("Unauthorized");

	const result = categorySchema.safeParse({
		name: formData.get("name"),
		id: formData.get("id"),
		description: formData.get("description"),
	});
	if (result.success) {
		await db.category.upsert({
			where: { id: Number(result.data.id) },
			create: {
				name: result.data.name,
				description: result.data.description,
			},
			update: {
				name: result.data.name,
				description: result.data.description,
			},
		});
		revalidatePath("/admin/categorias");
		redirect("/admin/categorias");
	} else {
		return {
			error: result.error.flatten(),
		};
	}
};
