import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/ui/table";
import { formatDate, formatPrice } from "@/shared/utils";
import type { ExtendedSale } from "@/types/sale";

const SaleDetail = async ({ sale }: { sale: ExtendedSale }) => {
	return (
		<div className="gap-3 grid grid-cols-1 md:grid-cols-2 p-0">
			<Card className="col-span-2 sm:col-span-1">
				<CardHeader>
					<CardTitle>Resumen de la Venta</CardTitle>
				</CardHeader>
				<CardContent className="gap-4 grid">
					<div className="flex justify-between items-center">
						<span>Compra #</span>
						<span className="font-medium">{sale.id}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>Fecha de Compra</span>
						<span className="font-medium">{formatDate(sale.createdAt)}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>Importe Total</span>
						<span className="font-medium">{formatPrice(sale.total)}</span>
					</div>
					<div className="flex justify-between items-center">
						<span>Metodo de Pago</span>
						<span className="font-medium">Mercado Pago</span>
					</div>
				</CardContent>
			</Card>
			<Card className="col-span-2 sm:col-span-1">
				<CardHeader>
					<CardTitle>Informacion de Envío</CardTitle>
				</CardHeader>
				<CardContent className="gap-4 grid">
					<div>
						<span className="font-bold">Dirección</span>
						<p>
							{sale.user.address}
							<br />
							{sale.user.city}, {sale.user.province?.name}
							<br />({sale.user.zipCode})
							{sale.user.comments && sale.user.comments?.length > 0 && (
								<div>
									<p className="font-bold">Comentarios: </p>
									<p>{sale.user.comments}</p>
								</div>
							)}
						</p>
					</div>
				</CardContent>
			</Card>
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle>Productos Comprados</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Producto</TableHead>
								<TableHead className="text-right">Cantidad</TableHead>
								<TableHead className="text-right">Precio</TableHead>
								<TableHead className="text-right">Total</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sale.saleItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.product.name}</TableCell>
									<TableCell className="text-right">{item.quantity}</TableCell>
									<TableCell className="text-right">
										{formatPrice(item.price)}
									</TableCell>
									<TableCell className="text-right">
										{formatPrice(item.price * item.quantity)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default SaleDetail;
