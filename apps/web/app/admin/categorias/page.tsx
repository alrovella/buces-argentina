import CategoryList from "@/components/dashboard/categories/List";
import ListSkeleton from "@/components/shared/ListSkeleton";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { Flex } from "@repo/ui/components/ui/flex";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
	return (
		<>
			<Flex justify="between" className="mb-2">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>Categorías</BreadcrumbItem>
						<BreadcrumbSeparator />
					</BreadcrumbList>
				</Breadcrumb>
				<Link
					className={buttonVariants({ variant: "default", size: "xs" })}
					href="/admin/categorias/nuevo"
				>
					Crear nueva categoría
				</Link>
			</Flex>
			<Suspense fallback={<ListSkeleton />}>
				<CategoryList />
			</Suspense>
		</>
	);
}
