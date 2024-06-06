import Link from "next/link";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "@repo/ui/components/ui/menubar";
import { ChevronsUpDown } from "lucide-react";
import { getAllCategories } from "@/actions/categories";
import slugify from "slugify";

const CategoriesSelect = async ({
	categoryName,
}: {
	categoryName?: string;
}) => {
	const categories = await getAllCategories();
	if (categories.length <= 1) return <></>;
	return (
		<Menubar className="shadow-sm border">
			<MenubarMenu>
				<MenubarTrigger className="cursor-pointer">
					{categoryName ?? "Categorías"}
					<ChevronsUpDown className="ml-2 w-4 h-4" />
				</MenubarTrigger>
				<MenubarContent align="end">
					{categories.map((category) => (
						<MenubarItem key={category.id}>
							<Link
								href={`/categorias/${category.id}/${slugify(
									category.name,
								).toLowerCase()}`}
								className="w-full"
							>
								{category.name}
							</Link>
						</MenubarItem>
					))}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

export default CategoriesSelect;
