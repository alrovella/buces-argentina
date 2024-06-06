import ProductList from "@/components/dashboard/products/ProductList";
import ListSkeleton from "@/components/shared/ListSkeleton";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
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
						<BreadcrumbItem>Productos</BreadcrumbItem>
						<BreadcrumbSeparator />
					</BreadcrumbList>
				</Breadcrumb>
				<Link
					className={buttonVariants({ variant: "default", size: "xs" })}
					href="/admin/productos/nuevo"
				>
					Crear nuevo producto
				</Link>
			</Flex>
			<Suspense fallback={<ListSkeleton />}>
				<ProductList />
			</Suspense>
		</>
	);
}
