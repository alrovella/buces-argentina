import Link from "next/link";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

import { notFound } from "next/navigation";
import MyPurchaseDetail from "@/components/my-purchases/MyPurchaseDetail";
import { getPurchaseById } from "@/actions/purchases";
import { getLoggedInUser, getUserById } from "@/actions/users";

export const metadata = {
	title: `Mis Compras`,
};
type PageProps = {
	params: { id: string };
};

const Page = async ({ params }: PageProps) => {
	if (!params.id) notFound();
	const purchase = await getPurchaseById(Number(params.id));
	if (!purchase) notFound();
	const user = await getLoggedInUser();
	if (!user) notFound();
	return (
		<>
			<SignedIn>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<Link href="/">Inicio</Link>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>Mis Compras</BreadcrumbItem>
						<BreadcrumbItem>Compra #{purchase.id}</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<MyPurchaseDetail user={user} purchase={purchase} />
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
};
export default Page;
