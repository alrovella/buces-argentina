import ListSkeleton from "@/components/shared/ListSkeleton";
import SaleList from "@/components/dashboard/sales/SaleList";
import { Suspense } from "react";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { getAllProvinces } from "@/actions/provinces";
import ProvincesForm from "@/components/admin/provinces/ProvincesForm";

export default async function Page() {
	const provinces = await getAllProvinces();

	return (
		<>
			<div className="flex justify-between items-center">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>Costos de Envío</BreadcrumbItem>
						<BreadcrumbSeparator />
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<Suspense fallback={<ListSkeleton />}>
				<ProvincesForm provinces={provinces} />
			</Suspense>
		</>
	);
}
