"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useDebouncedCallback } from "use-debounce";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@repo/ui/components/ui/table";
import { Button } from "@repo/ui/components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import slugify from "slugify";
import Link from "next/link";
import { getDiscountCouponByCode } from "@/actions/discountCoupons";
import PlantCartImage from "../layout/PlantCartImage";
import { LABELS } from "@/shared/labels";
import QuantityInput from "./QuantityInput";
import { formatPrice } from "@/shared/utils";

const CartTable = () => {
	const {
		products,
		removeProduct,
		getSubTotal,
		getTotal,
		setDiscountCoupon,
		discountCoupon,
		getDiscountAmount,
	} = useCartStore();

	const handleChange = useDebouncedCallback(async (couponCode: string) => {
		const trimmedCouponCode = couponCode.toUpperCase().trim();
		const discountCoupon = await getDiscountCouponByCode(trimmedCouponCode);
		discountCoupon
			? setDiscountCoupon(discountCoupon)
			: setDiscountCoupon(undefined);
	}, 500);

	return (
		<div className="mb-4">
			<section>
				{products.length > 0 ? (
					<>
						<div className="mb-4">
							<Table className="m-0 p-0">
								<TableHeader>
									<TableRow>
										<TableCell className="p-1">{LABELS.CART.PRODUCT}</TableCell>
										<TableCell className="text-right hidden md:!hidden">
											{LABELS.CART.PRICE}
										</TableCell>
										<TableCell className="text-center">
											{LABELS.CART.QUANTITY}
										</TableCell>
										<TableCell className="text-right">
											{LABELS.CART.TOTAL}
										</TableCell>
										<TableCell className="p-1"> </TableCell>
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
											<TableCell className="text-right hidden md:!hidden">
												{formatPrice(product.price)}
											</TableCell>
											<TableCell className="flex justify-center items-center">
												<QuantityInput
													productId={product.id}
													quantity={product.quantity}
												/>
											</TableCell>
											<TableCell className="text-right">
												{formatPrice(product.total)}
											</TableCell>
											<TableCell className="text-right">
												<Button
													variant="link"
													className="text-destructive"
													size="icon"
													onClick={() => {
														removeProduct(product.id);
													}}
												>
													<Trash2 className="w-4 h-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
						<div className="flex justify-end items-center mb-4 pr-4 w-full">
							<label className="text-sm" htmlFor="discountCode">
								{LABELS.CART.DISCOUNT_COUPON}
							</label>
							<Input
								type="text"
								placeholder="Código"
								maxLength={12}
								name="discountCode"
								defaultValue={discountCoupon?.code}
								onChange={(e) => handleChange(e.target.value)}
								className="ml-2 p-2 w-32"
							/>
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
									<TableCell className="text-right font-bold">
										{LABELS.CART.TOTAL_TO_PAY}
									</TableCell>
									<TableCell className="text-right font-bold">
										{formatPrice(getTotal(false))}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</>
				) : (
					<div className="flex flex-col justify-center items-center mx-auto mb-8 p-4 w-full sm:w-1/2">
						<PlantCartImage />
						<h3 className="font-bold text-2xl text-center">
							{LABELS.CART.NO_PRODUCTS}
						</h3>
						<Link href="/" className="mt-4">
							{LABELS.COMMON.BACK_HOME}
						</Link>
					</div>
				)}
			</section>
		</div>
	);
};

export default CartTable;
