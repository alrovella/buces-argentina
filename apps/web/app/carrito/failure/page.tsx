/* eslint-disable @next/next/no-img-element */
import PlantCartImage from "@/components/layout/PlantCartImage";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { Flex } from "@repo/ui/components/ui/flex";
import { LABELS } from "@/shared/labels";
import Link from "next/link";

export const metadata = {
	title: LABELS.CART.FAILED_PURCHASE,
};

const Page = async () => {
	return (
		<>
			<Breadcrumb className="mb-4">
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link href="/">Inicio</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<Link href="/carrito">Mi Carrito</Link>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Flex
				variant="col"
				className="justify-center mx-auto mb-8 p-4 w-full sm:w-1/2"
			>
				<PlantCartImage />
				<h3 className="mb-4 font-bold text-2xl text-center text-destructive">
					{LABELS.CART.FAILED_PURCHASE_TEXT}
				</h3>

				<p className="mb-8 text-center">
					{LABELS.CART.RETRY_MESSAGE} {LABELS.COMMON.BACK_HOME}{" "}
					{process.env.APP_EMAIL ?? ""}
				</p>
				<Link href="/" className="mt-4">
					{LABELS.COMMON.BACK_HOME}
				</Link>
			</Flex>
		</>
	);
};
export default Page;
