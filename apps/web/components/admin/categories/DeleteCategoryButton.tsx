"use client";

import { deleteCategory } from "@/actions/categories";
import { Button } from "@repo/ui/components/ui/button";
import { TrashIcon } from "lucide-react";

const DeleteCategoryButton = ({
	id,
	disabled,
}: {
	id: number;
	disabled: boolean;
}) => {
	return (
		<Button
			variant="destructive"
			disabled={disabled}
			title={
				disabled
					? "No puedes borrar esta categoría porque tiene productos relacionados"
					: "Eliminar"
			}
			size="sm"
			onClick={() => {
				deleteCategory(id);
			}}
		>
			<TrashIcon className="w-4 h-4" />
		</Button>
	);
};

export default DeleteCategoryButton;
