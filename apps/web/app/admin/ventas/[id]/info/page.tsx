import CardSkeleton from "@/components/shared/CardSkeleton";
import SaleDetail from "@/components/dashboard/sales/SaleDetail";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { getSaleById } from "@/actions/sales";
import type { ExtendedSale } from "@/types/sale";

export default async function Page({
	params,
}: Readonly<{
	params?: {
		id?: string;
	};
}>) {
	if (!params?.id) notFound();
	const sale = (await getSaleById(Number(params.id))) as ExtendedSale;
	if (!sale) notFound();
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbLink href="/admin/ventas">Ventas</BreadcrumbLink>
					<BreadcrumbSeparator />
					<BreadcrumbItem>Detalle Venta #{params.id}</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Suspense fallback={<CardSkeleton />}>
				<SaleDetail sale={sale} />
			</Suspense>
		</>
	);
}
