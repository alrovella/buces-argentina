"use client";
import {
	Breadcrumb as BreadcrumbShadCN,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import type { ExtendedProduct } from "@/types/product";
import Link from "next/link";
import { usePathname } from "next/navigation";
import slugify from "slugify";

const ProductBreadcrumb = ({ product }: { product: ExtendedProduct }) => {
	const pathname = usePathname();
	return (
		<BreadcrumbShadCN className="border-foreground/20 mb-4">
			<BreadcrumbList>
				<BreadcrumbItem>
					<Link href="/">Inicio</Link>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<Link
						href={`/categorias/${product.category.id}/${slugify(
							product.category.name.toLowerCase(),
						)}`}
					>
						{product.category.name}
					</Link>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<Link href={pathname}>{product.name}</Link>
				</BreadcrumbItem>
			</BreadcrumbList>
		</BreadcrumbShadCN>
	);
};

export default ProductBreadcrumb;
