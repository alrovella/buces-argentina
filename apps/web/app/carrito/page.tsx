import CartTable from "@/components/cart/CartTable";
import FinishSaleButton from "@/components/cart/FinishSaleButton";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { LABELS } from "@/shared/labels";
import Link from "next/link";

export const metadata = {
	title: LABELS.CART.MY_CART,
};

const Page = async () => {
	return (
		<>
			<Breadcrumb className="mb-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link href="/">{LABELS.COMMON.HOME}</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<Link href="/carrito">{LABELS.CART.MY_CART}</Link>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<CartTable />
			<FinishSaleButton />
		</>
	);
};
export default Page;
