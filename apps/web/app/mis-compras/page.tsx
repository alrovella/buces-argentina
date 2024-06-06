import Link from "next/link";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyPurchases } from "@/actions/purchases";
import MyPurchasesList from "@/components/my-purchases/MyPurchasesList";
import { LABELS } from "@/shared/labels";

export const metadata = {
	title: LABELS.PURCHASES.MY_PURCHASES,
};

const Page = async () => {
	const myPurchases = await getMyPurchases(1, 10000);

	return (
		<>
			<SignedIn>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<Link href="/">{LABELS.COMMON.HOME}</Link>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>{LABELS.PURCHASES.MY_PURCHASES}</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<MyPurchasesList purchases={myPurchases ?? []} />
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
};
export default Page;
