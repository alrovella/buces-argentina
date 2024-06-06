"use client";

import { useCartStore } from "@/hooks/useCartStore";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/components/ui/select";
import { Textarea } from "@repo/ui/components/ui/textarea";
import type { Province } from "@prisma/client";
import { Label } from "@repo/ui/components/ui/label";
import { Send } from "lucide-react";
import { useCallback, useEffect } from "react";

const ShippingInfo = ({ provinces }: { provinces: Province[] }) => {
	const {
		products,
		getDiscountAmount,
		discountCoupon,
		user,
		setUser,
		setShippingCost,
		shippingCost,
	} = useCartStore();

	const handleShippingCosts = useCallback(
		(provinceId: number | undefined) => {
			if (!provinceId) return 0;
			const province = provinces.find((p) => p.id === provinceId);
			if (province) {
				setShippingCost(province.shippingCost);
			}
		},
		[provinces, setShippingCost],
	);

	useEffect(() => {
		if (user.provinceId) handleShippingCosts(user.provinceId);
	}, [user.provinceId, handleShippingCosts]);

	useEffect(() => {
		if (!user.provinceId) handleShippingCosts(provinces[1]?.id);
	}, [provinces, handleShippingCosts, user.provinceId]);

	return (
		<Card className="w-full md:min-h-[660px]">
			<CardHeader className="select-none">
				<CardTitle className="flex items-center gap-1">
					<Send className="w-5 h-6" />
					Datos del Envío
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="gap-1 grid grid-cols-2">
					<div className="mb-2">
						<Label htmlFor="firstName">Nombre</Label>
						<Input
							type="text"
							required
							name="firstName"
							defaultValue={user.firstName ?? ""}
							onChange={(e) => {
								setUser({
									...user,
									firstName: e.target.value,
								});
							}}
							placeholder="Nombre"
						/>
					</div>
					<div className="mb-2">
						<Label htmlFor="lastName">Apellido</Label>
						<Input
							type="text"
							required
							name="lastName"
							defaultValue={user.lastName ?? ""}
							onChange={(e) => {
								setUser({
									...user,
									lastName: e.target.value,
								});
							}}
							placeholder="Apellido"
						/>
					</div>
					<div className="mb-2">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							required
							name="email"
							defaultValue={user.email}
							onChange={(e) => {
								setUser({
									...user,
									email: e.target.value,
								});
							}}
							placeholder="Email"
						/>
					</div>
					<div className="mb-2">
						<Label htmlFor="address">Teléfono</Label>
						<Input
							type="tel"
							required
							name="phone"
							defaultValue={user.phone ?? ""}
							onChange={(e) => {
								setUser({
									...user,
									phone: e.target.value,
								});
							}}
							placeholder="Teléfono"
						/>
					</div>
					<div className="mb-2">
						<Label htmlFor="address">Dirección</Label>
						<Input
							type="text"
							required
							name="address"
							defaultValue={user.address ?? ""}
							onChange={(e) => {
								setUser({
									...user,
									address: e.target.value,
								});
							}}
							placeholder="Calle, numero, piso, depto"
						/>
					</div>
					<div className="mb-2">
						<Label htmlFor="city">Ciudad</Label>
						<Input
							type="text"
							required
							name="city"
							defaultValue={user.city ?? ""}
							placeholder="Ciudad"
							onChange={(e) => {
								setUser({
									...user,
									city: e.target.value,
								});
							}}
						/>
					</div>
					<div className="mb-2">
						<Label htmlFor="provinceId">Provincia</Label>
						<Select
							required
							name="provinceId"
							defaultValue={
								user.provinceId
									? user.provinceId.toString()
									: provinces[1]?.id.toString()
							}
							onValueChange={(e) => {
								setUser({
									...user,
									provinceId: Number(e),
								});
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccionar Provincia" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{provinces.map((province) => (
										<SelectItem
											key={province.id}
											value={province.id.toString()}
										>
											{province.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="mb-2">
						<Label htmlFor="zipCode">Código Postal</Label>
						<Input
							type="text"
							required
							name="zipCode"
							defaultValue={user.zipCode ?? ""}
							onChange={(e) => {
								setUser({
									...user,
									zipCode: e.target.value,
								});
							}}
							placeholder="Código Postal"
						/>
					</div>
					<Textarea
						className="col-span-2"
						name="comments"
						defaultValue={user.comments ?? ""}
						onChange={(e) => {
							setUser({
								...user,
								comments: e.target.value,
							});
						}}
						placeholder="Dejanos tus comentarios"
					/>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between items-center">
				{products.map((product) => (
					<div className="hidden" key={product.id}>
						<input type="hidden" name="productId" value={product.id} />
						<input type="hidden" name="productName" value={product.name} />
						<input type="hidden" name="quantity" value={product.quantity} />
						<input type="hidden" name="price" value={product.price} />
						<input type="hidden" name="total" value={product.total} />
					</div>
				))}

				<input
					type="hidden"
					name="discountAmount"
					value={getDiscountAmount()}
				/>
				<input
					type="hidden"
					name="discountCouponId"
					value={discountCoupon?.id}
				/>
				<input
					type="hidden"
					name="discountPercentage"
					value={discountCoupon?.discount}
				/>
				<input type="hidden" name="shippingCost" value={shippingCost} />
			</CardFooter>
		</Card>
	);
};
export default ShippingInfo;
