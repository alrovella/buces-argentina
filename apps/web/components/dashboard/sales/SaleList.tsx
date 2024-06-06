import { getAllSales } from "@/actions/sales";
import { Edit } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/ui/table";
import { formatDate, formatPrice } from "@/shared/utils";
import Link from "next/link";
const SaleList = async ({
	page,
	from,
	to,
	limit,
}: {
	page: number;
	from: string | undefined;
	to: string | undefined;
	limit: number;
}) => {
	const sales = await getAllSales(from, to, page, limit);

	return (
		<>
			{sales.length === 0 && (
				<p className="p-2 text-destructive">No hay ventas</p>
			)}
			{sales.length > 0 && (
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-muted/0">
							<TableHead className="hidden md:table-cell">#</TableHead>
							<TableHead>Fecha</TableHead>
							<TableHead className="hidden md:table-cell">Usuario</TableHead>
							<TableHead className="hidden md:table-cell text-center">
								Cantidad Productos
							</TableHead>
							<TableHead className="hidden md:table-cell text-right">
								Subtotal
							</TableHead>
							<TableHead className="text-right">Total</TableHead>
							<TableHead>
								<span className="sr-only">Opciones</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sales.map((sale) => (
							<TableRow key={sale.id}>
								<TableCell className="hidden md:table-cell">
									{sale.id}
								</TableCell>
								<TableCell className="font-medium">
									{formatDate(sale.createdAt)}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{sale.user.firstName} {sale.user.lastName}
								</TableCell>
								<TableCell className="hidden md:table-cell text-center">
									{sale.saleItems.reduce(
										(acc: number, item: { quantity: number }) =>
											acc + item.quantity,
										0,
									)}
								</TableCell>
								<TableCell className="hidden md:table-cell text-right">
									{formatPrice(
										sale.saleItems.reduce(
											(
												acc: number,
												item: { price: number; quantity: number },
											) => acc + item.price * item.quantity,
											0,
										) ?? 0,
									)}
								</TableCell>
								<TableCell className="text-right">
									{formatPrice(
										sale.saleItems.reduce(
											(
												acc: number,
												item: { price: number; quantity: number },
											) => acc + item.price * item.quantity,
											0,
										) ?? 0,
									)}
								</TableCell>
								<TableCell className="flex justify-end gap-2">
									<Link href={`/admin/ventas/${sale.id}/info`}>
										<span className="sr-only">Detalle</span>
										<Edit className="w-4 h-4" />
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</>
	);
};

export default SaleList;
