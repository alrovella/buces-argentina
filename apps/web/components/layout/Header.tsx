import Link from "next/link";
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import { Leaf } from "lucide-react";
import { isAdmin } from "@/actions/users";
import HeaderMenu from "./HeaderMenu";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { cn } from "@/shared/utils";

const Header = async () => {
	const userIsAdmin = await isAdmin();

	return (
		<header className="top-0 z-50 sticky inset-x-0 flex justify-between items-center bg-background/80 shadow-sm dark:shadow-white/15 backdrop-blur-sm px-2 sm:px-6 py-4 border-r border-r-foreground/10 border-b border-b-foreground/10 border-l border-l-foreground/10 rounded-bl-lg rounded-br-lg w-full max-w-6xl transition-all">
			<Link href="/" className="flex items-center">
				<Leaf className="w-8 h-8 text-foreground/75 fill-primary" />
				<div>
					<span className="text-foreground text-xl">BUCES</span>
					<span className="font-bold text-primary text-xl">ARGENTINA</span>
				</div>
			</Link>
			<div className="flex items-center gap-2">
				<SignedOut>
					<SignInButton>
						<span
							className={cn(
								"w-fit",
								buttonVariants({ variant: "link", size: "sm" }),
							)}
						>
							Ingresar
						</span>
					</SignInButton>
					<SignUpButton>
						<span
							className={cn(
								"w-fit",
								buttonVariants({ variant: "link", size: "sm" }),
							)}
						>
							Registrarse
						</span>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<UserButton afterSignOutUrl="/" userProfileMode="modal" />
					<HeaderMenu isAdmin={userIsAdmin} />
				</SignedIn>
			</div>
		</header>
	);
};

export default Header;
