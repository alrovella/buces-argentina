import CardSkeleton from "@/components/shared/CardSkeleton";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import UserForm from "@/components/dashboard/users/Form";
import { getUserById } from "@/actions/users";
import { getAllProvinces } from "@/actions/provinces";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";

export default async function Page({
	params,
}: Readonly<{
	params?: {
		id?: string;
	};
}>) {
	if (!params?.id) notFound();

	const user = await getUserById(Number(params.id));
	const provinces = await getAllProvinces();

	if (!user) notFound();
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>Usuarios</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>Editar Usuario</BreadcrumbItem>
					<BreadcrumbSeparator />
				</BreadcrumbList>
			</Breadcrumb>
			<Suspense fallback={<CardSkeleton />}>
				<UserForm user={user} provinces={provinces} />
			</Suspense>
		</>
	);
}
