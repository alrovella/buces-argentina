import { getAllCategories } from "@/actions/categories";
import DeleteCategoryButton from "@/components/admin/categories/DeleteCategoryButton";
import { buttonVariants } from "@repo/ui/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/ui/table";
import { Edit } from "lucide-react";
import Link from "next/link";

const CategoryList = async () => {
	const categories = await getAllCategories();

	return (
		<>
			{categories.length === 0 && (
				<p className="p-2 text-destructive">No hay categorias disponibles</p>
			)}
			{categories.length > 0 && (
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-muted/0">
							<TableHead>Nombre</TableHead>
							<TableHead> </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories.map((category) => (
							<TableRow key={category.id}>
								<TableCell className="font-medium">{category.name}</TableCell>
								<TableCell className="flex justify-end gap-1">
									<Link
										href={`/admin/categorias/editar/${category.id}`}
										className={buttonVariants({
											variant: "outline",
											size: "sm",
										})}
									>
										<span className="sr-only">Detalle</span>
										<Edit className="w-4 h-4" />
									</Link>

									<DeleteCategoryButton
										id={category.id}
										disabled={category.products.length > 0}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</>
	);
};

export default CategoryList;
