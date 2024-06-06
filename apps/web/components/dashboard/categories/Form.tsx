"use client";

import { Save } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import type { Category } from "@prisma/client";
import { addOrUpdateCategory } from "@/actions/categories";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import SubmitButton from "../../shared/SubmitButton";
import { Textarea } from "@repo/ui/components/ui/textarea";

const CategoryForm = ({ category }: { category?: Category }) => {
	const [state, formAction] = useFormState(addOrUpdateCategory, null);

	useEffect(() => {
		if (state?.error)
			toast.error(Object.values(state.error.fieldErrors).join(", "));
	}, [state]);

	return (
		<form action={formAction} className="w-full md:w-1/2">
			<div className="gap-3 grid mb-2">
				<Label htmlFor="name">Nombre</Label>
				<Input
					name="name"
					type="text"
					className="w-full"
					defaultValue={category?.name}
				/>
			</div>
			<div className="gap-3 grid mb-4">
				<Label htmlFor="description">Descripción</Label>
				<Textarea
					name="description"
					defaultValue={category?.description ?? ""}
					className="min-h-32"
				/>
			</div>
			<SubmitButton className="w-full">
				<Save className="w-3.5 h-3.5" />
				Guardar Categoría
			</SubmitButton>
			<input type="hidden" name="id" value={category?.id} />
		</form>
	);
};
export default CategoryForm;
