import { Edit, Link2 } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/ui/table";
import Link from "next/link";
import { getAllProducts } from "@/actions/products";
import slugify from "slugify";
import { formatPrice } from "@/shared/utils";
import { buttonVariants } from "@repo/ui/components/ui/button";
import DeleteProductButton from "@/components/admin/products/DeleteProductButton";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import UndeleteProductButton from "@/components/admin/products/UndeleteProductButton";

const ProductList = async () => {
	const activeProducts = await getAllProducts(false);
	const inactiveProducts = await getAllProducts(false, true);
	return (
		<Tabs defaultValue="actives" className="w-full">
			<TabsList className="grid grid-cols-2 w-full">
				<TabsTrigger value="actives">
					Productos Activos ({activeProducts.length})
				</TabsTrigger>
				<TabsTrigger value="inactives">
					Productos Inactivos ({inactiveProducts.length})
				</TabsTrigger>
			</TabsList>
			<TabsContent value="actives">
				<>
					{activeProducts.length === 0 && (
						<p className="p-2 text-destructive">No hay productos</p>
					)}
					{activeProducts.length > 0 && (
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-muted/0">
									<TableHead className="hidden md:table-cell">#</TableHead>
									<TableHead>Nombre</TableHead>
									<TableHead className="hidden md:table-cell">
										Categoría
									</TableHead>
									<TableHead className="text-right">Total</TableHead>
									<TableHead>
										<span className="sr-only">Opciones</span>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{activeProducts.map((product) => (
									<TableRow key={product.id}>
										<TableCell className="hidden md:table-cell">
											{product.id}
										</TableCell>
										<TableCell className="font-medium">
											{product.name}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{product.category.name}
										</TableCell>
										<TableCell className="text-right">
											{formatPrice(product.price)}
										</TableCell>
										<TableCell className="flex justify-end gap-2">
											<Link
												className={buttonVariants({
													variant: "outline",
													size: "sm",
												})}
												href={`/productos/${product.id}/${slugify(
													product.name,
												)}`}
											>
												<Link2 className="w-4 h-4" />
											</Link>
											<Link
												className={buttonVariants({
													variant: "outline",
													size: "sm",
												})}
												href={`/admin/productos/editar/${product.id}`}
											>
												<span className="sr-only">Detalle</span>
												<Edit className="w-4 h-4" />
											</Link>
											<DeleteProductButton id={product.id} />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</>
			</TabsContent>
			<TabsContent value="inactives">
				<>
					{inactiveProducts.length === 0 && (
						<p className="p-2 text-destructive">No hay productos</p>
					)}
					{inactiveProducts.length > 0 && (
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-muted/0">
									<TableHead className="hidden md:table-cell">#</TableHead>
									<TableHead>Nombre</TableHead>
									<TableHead className="hidden md:table-cell">
										Categoría
									</TableHead>
									<TableHead className="text-right">Total</TableHead>
									<TableHead>
										<span className="sr-only">Opciones</span>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{inactiveProducts.map((product) => (
									<TableRow key={product.id}>
										<TableCell className="hidden md:table-cell">
											{product.id}
										</TableCell>
										<TableCell className="font-medium">
											{product.name}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{product.category.name}
										</TableCell>
										<TableCell className="text-right">
											{formatPrice(product.price)}
										</TableCell>
										<TableCell className="flex justify-end gap-2">
											<Link
												className={buttonVariants({
													variant: "outline",
													size: "sm",
												})}
												href={`/productos/${product.id}/${slugify(
													product.name,
												)}`}
											>
												<Link2 className="w-4 h-4" />
											</Link>
											<Link
												className={buttonVariants({
													variant: "outline",
													size: "sm",
												})}
												href={`/admin/productos/editar/${product.id}`}
											>
												<span className="sr-only">Detalle</span>
												<Edit className="w-4 h-4" />
											</Link>
											<UndeleteProductButton id={product.id} />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</>
			</TabsContent>
		</Tabs>
	);
};

export default ProductList;
