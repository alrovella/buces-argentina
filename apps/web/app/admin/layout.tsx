import { Toaster } from "@repo/ui/components/ui/sonner";
import { SignedIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { isAdmin } from "@/actions/users";
import { redirect } from "next/navigation";
import { EdgeStoreProvider } from "@/providers/edgeStore";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.APP_URL ?? ""),
	title: {
		default: `${process.env.APP_NAME} - ${process.env.APP_SEO_TITLE}`,
		template: `%s | ${process.env.APP_NAME}`,
	},
	description: process.env.APP_SEO_DESCRIPTION ?? "",
	keywords: process.env.APP_SEO_KEYWORDS ?? "",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const loggedUserAdmin = await isAdmin();
	if (!loggedUserAdmin) return redirect("/");
	return (
		<EdgeStoreProvider>
			<SignedIn>
				{children}
				<Toaster position="top-center" richColors closeButton duration={1500} />
			</SignedIn>
		</EdgeStoreProvider>
	);
}
