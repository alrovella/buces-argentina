/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { cn } from "@/shared/utils";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Flex } from "@repo/ui/components/ui/flex";
const font = Roboto({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.APP_URL ?? ""),
	title: {
		default: `${process.env.APP_NAME} - ${process.env.APP_SEO_TITLE}`,
		template: `%s | ${process.env.APP_NAME}`,
	},
	description: process.env.APP_SEO_DESCRIPTION ?? "",
	keywords: process.env.APP_SEO_KEYWORDS ?? "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider localization={esMX}>
			<html
				lang="es"
				suppressHydrationWarning
				className="scrollbar-thumb-[#2e6c2c] !scroll-smooth scrollbar-thin"
			>
				<body
					className={cn(
						"bg-background text-foreground font-sans antialiased",
						font.className,
					)}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<TooltipProvider>
							<Flex variant="col">
								<Header />
								<div className="my-2 p-1 w-full max-w-6xl min-h-[85vh]">
									{children}
								</div>
								<Footer />
							</Flex>
						</TooltipProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
