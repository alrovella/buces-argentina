import CheckCart from "@/components/cart/CheckCart";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { getAllProvinces } from "@/actions/provinces";
import CheckoutForm from "@/components/cart/CheckoutForm";
import { LABELS } from "@/shared/labels";

export const metadata = {
	title: LABELS.CART.END_PURCHASE,
};

const Page = async () => {
	const provinces = await getAllProvinces();
	return (
		<>
			<CheckCart />
			<SignedIn>
				<Breadcrumb className="mb-4">
					<BreadcrumbList>
						<BreadcrumbItem>
							<Link href="/">{LABELS.COMMON.HOME}</Link>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<Link href="/carrito">{LABELS.CART.MY_CART}</Link>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>{LABELS.CART.END_PURCHASE}</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<CheckoutForm provinces={provinces} />
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
};
export default Page;
