"use server";

import db from "@repo/database/client";
import { productSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { isAdmin } from "./users";
import { join } from "node:path";
import { writeFile } from "node:fs/promises";

export const deleteProduct = async (id: number) => {
	try {
		const admin = await isAdmin();
		if (!admin) throw new Error("Unauthorized");
		await db.product.update({
			where: { id },
			data: {
				deleted: true,
			},
		});
		revalidatePath("/admin/productos");
		redirect("/admin/productos");
	} catch (error) {
		return null;
	}
};

export const undeleteProduct = async (id: number) => {
	try {
		const admin = await isAdmin();
		if (!admin) throw new Error("Unauthorized");
		await db.product.update({
			where: { id },
			data: {
				deleted: false,
			},
		});
		revalidatePath("/admin/productos");
		redirect("/admin/productos");
	} catch (error) {
		return null;
	}
};

export const getAllProducts = async (
	withImagesOnly = true,
	deleted = false,
) => {
	const products = await db.product.findMany({
		where: { deleted, images: withImagesOnly ? { some: {} } : {} },
		orderBy: { id: "desc" },
		include: {
			images: true,
			category: true,
		},
	});

	return products;
};

export const findProducts = async (q: string) => {
	if (q === "") return [];
	const products = await db.product.findMany({
		where: {
			deleted: false,
			images: { some: {} },
			OR: [
				{ name: { contains: q } },
				{ description: { contains: q } },
				{ keywords: { contains: q } },
			],
		},
		orderBy: { id: "desc" },
		include: {
			images: true,
			category: true,
		},
	});

	return products;
};

export const getProductById = async (id: number, deleted = false) => {
	try {
		const product = await db.product.findUnique({
			where: { deleted, id },
			include: { images: true, category: true },
		});
		return product;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getProductsByCategoryId = async (
	categoryId: number,
	deleted = false,
) => {
	const products = await db.product.findMany({
		orderBy: { id: "desc" },
		where: { deleted, categoryId, images: { some: {} } },
		include: { category: true, images: true },
	});
	return products;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const addOrUpdateProduct = async (state: any, formData: FormData) => {
	const admin = await isAdmin();
	if (!admin) throw new Error("Unauthorized");
	const result = productSchema.safeParse({
		name: formData.get("name"),
		id: formData.get("id"),
		description: formData.get("description"),
		categoryId: formData.get("categoryId"),
		price: formData.get("price"),
		isNew: formData.get("isNew") === "on",
		inStock: formData.get("inStock") === "on",
		keywords: formData.get("keywords"),
		redirectToProductPage: formData.get("redirectToProductPage") === "on",
	});

	if (result.success) {
		const productData = await db.product.upsert({
			where: { id: Number(result.data.id) },
			create: {
				name: result.data.name,
				description: result.data.description ?? "",
				categoryId: Number(result.data.categoryId),
				price: Number(result.data.price),
				isNew: result.data.isNew,
				inStock: result.data.inStock,
				keywords: result.data.keywords,
			},
			update: {
				name: result.data.name,
				description: result.data.description ?? "",
				categoryId: Number(result.data.categoryId),
				price: Number(result.data.price),
				isNew: result.data.isNew,
				inStock: result.data.inStock,
				keywords: result.data.keywords,
			},
		});

		revalidatePath("/admin/productos");

		if (result.data.redirectToProductPage) {
			redirect(`/productos/${result.data.id}/${slugify(result.data.name)}`);
		}

		if (result.data.id) {
			redirect("/admin/productos");
		} else {
			redirect(`/admin/productos/editar/${productData.id}?tabSection=images`);
		}
	} else {
		return {
			error: result.error.flatten(),
		};
	}
};

export const uploadImages = async (formData: FormData) => {
	const admin = await isAdmin();
	if (!admin) throw new Error("Unauthorized");

	const productId = formData.get("productId");
	const images = formData.getAll("images") as File[];
	// biome-ignore lint/complexity/noForEach: <explanation>
	images.forEach(async (image: File) => {
		const bytes = await image.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const path = join("public", "products", image.name);
		await writeFile(path, buffer).then(async () => {
			await db.productImage.create({
				data: {
					productId: Number(productId),
					url: image.name,
				},
			});
		});
	});
	redirect(`/admin/productos/editar/${productId}?tabSection=images`);
};

export const removeProductImage = async (
	productId: number,
	productImageId: string,
) => {
	const admin = await isAdmin();
	if (!admin) throw new Error("Unauthorized");

	await db.productImage.delete({ where: { id: productImageId } });
	redirect(`/admin/productos/editar/${productId}?tabSection=images`);
};

export const addProductImage = async (productId: number, url: string) => {
	const admin = await isAdmin();
	if (!admin) throw new Error("Unauthorized");

	await db.productImage.create({
		data: {
			productId,
			url,
		},
	});
	redirect(`/admin/productos/editar/${productId}?tabSection=images`);
};
