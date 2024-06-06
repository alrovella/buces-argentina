"use client";
import {
	BoxIcon,
	BoxesIcon,
	CircleDollarSign,
	Menu,
	ShoppingCartIcon,
	UserIcon,
	Wallet,
	Cog,
} from "lucide-react";
import {
	Menubar,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
	MenubarItem,
} from "@repo/ui/components/ui/menubar";
import { useCartStore } from "@/hooks/useCartStore";
import { cn } from "@/shared/utils";
import { Badge } from "@repo/ui/components/ui/badge";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
	{
		name: "Ventas",
		href: "/admin/ventas",
		icon: <Wallet className="w-5 h-5" />,
	},
	{
		name: "Productos",
		href: "/admin/productos",
		icon: <BoxIcon className="w-5 h-5" />,
	},
	{
		name: "Categorias",
		href: "/admin/categorias",
		icon: <BoxesIcon className="w-5 h-5" />,
	},
	{
		name: "Usuarios",
		href: "/admin/usuarios",
		icon: <UserIcon className="w-5 h-5" />,
	},
	{
		name: "Costos de Envío",
		href: "/admin/costos-envio",
		icon: <CircleDollarSign className="w-5 h-5" />,
	},
];

const HeaderMenu = ({ isAdmin }: { isAdmin: boolean }) => {
	const [open, setOpen] = useState(false);
	const { products } = useCartStore();

	const productsQuantity = products.reduce(
		(acc, product) => acc + product.quantity,
		0,
	);

	return (
		<Menubar className="shadow-sm">
			<MenubarMenu>
				<MenubarTrigger
					className="cursor-pointer"
					onClick={() => setOpen(true)}
				>
					<Menu className="w-6 h-6" />
				</MenubarTrigger>
				{open && (
					<MenubarContent align="end" className="z-[100]">
						<SignedIn>
							{isAdmin ? (
								<>
									{navLinks.map((link) => (
										<MenubarItem key={link.name}>
											<Link
												href={link.href}
												className="flex items-center gap-2 w-full"
												onClick={() => setOpen(false)}
											>
												{link.icon}
												{link.name}
											</Link>
										</MenubarItem>
									))}
								</>
							) : (
								<>
									<MenubarItem>
										<Link
											href="/mis-compras"
											className="flex items-center gap-2 w-full"
											onClick={() => setOpen(false)}
										>
											<Cog className="w-4 h-4" /> Mis Compras
										</Link>
									</MenubarItem>
									<MenubarItem>
										<Link
											href="/carrito"
											className="flex justify-between items-center gap-2 w-full"
											onClick={() => setOpen(false)}
										>
											<span className="flex items-center gap-2">
												<ShoppingCartIcon className="w-4 h-4" /> Mi Carrito
											</span>
											<Badge
												variant="default"
												className={cn(
													"size-4 text-xs rounded-full flex justify-center items-center",
													productsQuantity > 0 && "animate-pulse-slow ",
												)}
											>
												{products.reduce(
													(acc: number, product: { quantity: number }) =>
														acc + product.quantity,
													0,
												)}
											</Badge>
										</Link>
									</MenubarItem>
								</>
							)}
						</SignedIn>
					</MenubarContent>
				)}
			</MenubarMenu>
		</Menubar>
	);
};

export default HeaderMenu;
