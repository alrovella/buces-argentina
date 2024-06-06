/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import Link from "next/link";
import ClearCart from "@/components/cart/ClearCart";
import PlantCartImage from "@/components/layout/PlantCartImage";
import { LABELS } from "@/shared/labels";
import { Flex } from "@repo/ui/components/ui/flex";

export const metadata = {
	title: LABELS.CART.PURCHASE_DONE,
};

const Page = async ({
	searchParams,
}: {
	searchParams: { payment_id: string };
}) => {
	if (!searchParams.payment_id) {
		notFound();
	}

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
			<Flex
				variant="col"
				className="justify-center mx-auto mb-8 p-4 w-full sm:w-1/2"
			>
				<PlantCartImage />
				<h3 className="font-bold text-2xl text-center">
					{LABELS.CART.PURCHASE_DONE_TEXT}
				</h3>
				<p>{LABELS.CART.PURCHASE_DONE_SUBTEXT}</p>
				<Link href="/" className="mt-4">
					{LABELS.COMMON.BACK_HOME}
				</Link>
				<ClearCart />
			</Flex>
		</>
	);
};
export default Page;
