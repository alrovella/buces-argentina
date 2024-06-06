import ListSkeleton from "@/components/shared/ListSkeleton";
import UserList from "@/components/dashboard/users/List";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { Suspense } from "react";

export default function Page() {
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>Usuarios</BreadcrumbItem>
					<BreadcrumbSeparator />
				</BreadcrumbList>
			</Breadcrumb>

			<Suspense fallback={<ListSkeleton />}>
				<UserList />
			</Suspense>
		</>
	);
}
