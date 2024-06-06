"use client";

import { useCartStore } from "@/hooks/useCartStore";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@repo/ui/components/ui/table";
import slugify from "slugify";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { MercadoPagoButton } from "./MercadoPagoButton";
import { ShoppingCart } from "lucide-react";
import { LABELS } from "@/shared/labels";
import { formatPrice } from "@/shared/utils";

const CartSummary = () => {
	const {
		products,
		getSubTotal,
		getTotal,
		discountCoupon,
		getDiscountAmount,
		shippingCost,
	} = useCartStore();

	return (
		<div>
			<Card className="w-full md:min-h-[660px] select-none">
				<CardHeader>
					<CardTitle className="flex items-center gap-1">
						<ShoppingCart className="w-5 h-5" /> {LABELS.CART.PURCHASE_SUMMARY}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4 border-b">
						<Table>
							<TableHeader>
								<TableRow>
									<TableCell className="font-bold">Producto</TableCell>
									<TableCell className="font-bold text-center">
										{LABELS.CART.QUANTITY}
									</TableCell>
									<TableCell className="text-right font-bold">
										{LABELS.CART.TOTAL}
									</TableCell>
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product) => (
									<TableRow key={product.id}>
										<TableCell className="p-1">
											<Link
												href={`/productos/${product.id}/${slugify(
													product.name,
												)}`}
											>
												{product.name}
											</Link>
										</TableCell>
										<TableCell className="flex justify-center items-center">
											{product.quantity}
										</TableCell>
										<TableCell className="text-right">
											{formatPrice(product.total)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-right">
									{LABELS.CART.TOTAL_PRODUCTS}
								</TableCell>
								<TableCell className="text-right">
									{formatPrice(getSubTotal())}
								</TableCell>
							</TableRow>
							{getDiscountAmount() > 0 && (
								<TableRow>
									<TableCell className="text-right">
										{LABELS.CART.DISCOUNT} {discountCoupon?.discount}%
									</TableCell>
									<TableCell className="text-right">
										{formatPrice(getDiscountAmount())}
									</TableCell>
								</TableRow>
							)}
							<TableRow>
								<TableCell className="text-right">
									{LABELS.CART.SHIPPINGCOST}
								</TableCell>
								<TableCell className="text-right">
									{shippingCost === 0 ? (
										<span className="font-bold text-primary">
											{LABELS.COMMON.FREE}
										</span>
									) : (
										formatPrice(shippingCost)
									)}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-right font-bold">
									{LABELS.CART.TOTAL_TO_PAY}
								</TableCell>
								<TableCell className="text-right font-bold">
									{formatPrice(getTotal(true))}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>

				<CardFooter className="flex flex-col gap-3 md:mt-12">
					<div className="bg-yellow-200 shadow-sm mb-4 p-3 border rounded-md text-center text-sm select-none">
						<strong>{LABELS.COMMON.IMPORTANT}</strong>
						<p>{LABELS.COMMON.IMPORTANT_TEXT_01}</p>
						<p>{LABELS.COMMON.IMPORTANT_TEXT_02}</p>
					</div>
					<MercadoPagoButton className="w-full sm:w-auto" />
				</CardFooter>
			</Card>
		</div>
	);
};

export default CartSummary;
