"use server";
import type { User } from "@repo/database/client";
import { UserRole } from "@prisma/client";
import db from "@repo/database/client";
import { userSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import type { ExtendedUser } from "@/types/user";

export async function isAdmin() {
	const { userId } = await auth();
	if (userId == null) return false;
	const userDb = await getUserByClerkId(userId);
	if (!userDb) return false;
	return userDb.role === UserRole.ADMIN;
}

export async function getLoggedInUser() {
	const { userId } = await auth();
	if (userId == null) return false;
	const userDb = await getUserByClerkId(userId);
	return userDb as ExtendedUser;
}

export async function isLoggedIn() {
	const { userId } = await auth();
	return userId == null;
}

export async function getUserById(id: number) {
	const user = await db.user.findUnique({ where: { id } });
	return user;
}

export async function getUserByClerkId(clerkId: string) {
	const user = await db.user.findUnique({
		where: { clerkId },
		include: { province: true },
	});
	return user;
}

export async function getAllUsers() {
	const users = await db.user.findMany();
	return users;
}

export async function addUser(user: User) {
	const data = await db.user.create({
		data: {
			clerkId: user?.clerkId,
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			id: user?.id,
			phone: user?.phone,
			address: user?.address,
			city: user?.city,
			provinceId: user?.provinceId,
			zipCode: user?.zipCode,
			comments: user?.comments,
			role: UserRole.USER,
		},
	});

	return data;
}

export const updateLoggedUserInfo = async (user: User) => {
	const clerkUser = await currentUser();
	if (!clerkUser) throw new Error("User not found");
	const userDb = await getUserByClerkId(clerkUser.id);
	if (!userDb) throw new Error("User not found");

	const data = await db.user.update({
		where: {
			id: userDb.id,
		},
		data: {
			clerkId: user?.clerkId,
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			phone: user?.phone,
			address: user?.address,
			city: user?.city,
			provinceId: user?.provinceId,
			zipCode: user?.zipCode,
			comments: user?.comments,
		},
	});
	return data;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const updateUser = async (state: any, formData: FormData) => {
	const result = userSchema.safeParse({
		id: formData.get("id"),
		firstName: formData.get("firstName"),
		lastName: formData.get("lastName"),
		email: formData.get("email"),
		phone: formData.get("phone"),
		address: formData.get("address"),
		city: formData.get("city"),
		provinceId: formData.get("provinceId"),
		zipCode: formData.get("zipCode"),
		comments: formData.get("comments"),
	});
	if (result.success) {
		await db.user.update({
			where: { id: Number(result.data.id) },
			data: {
				firstName: result.data.firstName,
				lastName: result.data.lastName,
				email: result.data.email,
				phone: result.data.phone,
				address: result.data.address,
				city: result.data.city,
				provinceId: Number(result.data.provinceId),
				zipCode: result.data.zipCode,
				comments: result.data.comments,
			},
		});
		revalidatePath("/admin/usuarios");
		redirect("/admin/usuarios");
	} else {
		return {
			error: result.error.flatten(),
		};
	}
};

export async function createUser(user: User) {
	const newUser = await db.user.create({
		data: user,
	});

	return newUser;
}
