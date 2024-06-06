"use client";

import { Save } from "lucide-react";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import type { Category, Product } from "@prisma/client";
import { addOrUpdateProduct } from "@/actions/products";
import { Input } from "@repo/ui/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/components/ui/select";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Label } from "@repo/ui/components/ui/label";
import SubmitButton from "../../shared/SubmitButton";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import Link from "next/link";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { cn } from "@/shared/utils";

const ProductForm = ({
	product,
	categories,
}: {
	product?: Product;
	categories: Category[];
}) => {
	const [state, formAction] = useFormState(addOrUpdateProduct, null);

	useEffect(() => {
		if (state?.error)
			toast.error(Object.values(state.error.fieldErrors).join(", "));
	}, [state]);

	return (
		<form action={formAction} className="w-full">
			<div className="gap-3 grid mb-4">
				<Label htmlFor="name">Nombre</Label>
				<Input
					name="name"
					type="text"
					className="w-full"
					defaultValue={product?.name}
				/>
			</div>
			<div className="gap-3 grid mb-4">
				<Label htmlFor="status">Categoría</Label>
				<Select
					name="categoryId"
					defaultValue={
						product?.categoryId?.toString() ?? categories[0]?.id.toString()
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Seleccionar Categoría" />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category) => (
							<SelectItem key={category.id} value={category.id.toString()}>
								{category.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="gap-3 grid mb-4">
				<Label htmlFor="description">Descripción</Label>
				<Textarea
					name="description"
					defaultValue={product?.description ?? ""}
					className="min-h-32"
				/>
			</div>

			<div className="gap-3 grid mb-4">
				<Label htmlFor="price">Precio</Label>
				<Input
					name="price"
					type="number"
					defaultValue={product?.price ?? "0"}
				/>
			</div>

			<div className="gap-3 grid mb-4">
				<Label htmlFor="name" className="flex items-center">
					<Checkbox
						name="isNew"
						defaultChecked={product?.isNew ?? true}
						className="mr-2"
					/>
					Producto Nuevo
				</Label>
			</div>

			<div className="gap-3 grid mb-4">
				<Label htmlFor="name">Palabras clave</Label>
				<Input
					name="keywords"
					type="text"
					className="w-full"
					defaultValue={product?.keywords ?? ""}
				/>
			</div>

			<div className="gap-3 grid mb-4">
				<Label htmlFor="name" className="flex items-center">
					<Checkbox
						name="inStock"
						defaultChecked={product?.inStock ?? true}
						className="mr-2"
					/>
					En stock
				</Label>
			</div>
			<div className="items-center gap-2 grid grid-cols-1 sm:grid-cols-2">
				<div className="flex items-center gap-1">
					<Link
						className={cn(
							buttonVariants({ variant: "outline", size: "xs" }),
							"w-full md:w-fit flex gap-1 items-center",
						)}
						href="/admin/productos"
					>
						Volver
					</Link>
					<SubmitButton>
						<Save className="w-3.5 h-3.5" />
						{product?.id ? "Guardar " : "Crear"}
					</SubmitButton>
				</div>
				{product?.id ? (
					<Label htmlFor="name" className="flex items-center">
						<Checkbox name="redirectToProductPage" className="mr-2" />
						Redireccionar a la pagina del producto
					</Label>
				) : null}
			</div>
			<input type="hidden" name="id" value={product?.id} />
		</form>
	);
};
export default ProductForm;
