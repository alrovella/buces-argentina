import ListSkeleton from "@/components/shared/ListSkeleton";
import SaleList from "@/components/dashboard/sales/SaleList";
import { Suspense } from "react";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";

export default async function Page({
	searchParams,
}: Readonly<{
	searchParams?: {
		page?: string;
		canceled?: string;
		from?: string;
		to?: string;
	};
}>) {
	return (
		<>
			<div className="flex justify-between items-center">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>Ventas</BreadcrumbItem>
						<BreadcrumbSeparator />
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<Suspense fallback={<ListSkeleton />}>
				<SaleList
					page={Number(searchParams?.page ?? 1)}
					from={searchParams?.from}
					to={searchParams?.to}
					limit={1000}
				/>
			</Suspense>
		</>
	);
}
