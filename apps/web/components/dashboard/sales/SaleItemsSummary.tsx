import type { ExtendedSaleItem } from "@/types/sale";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@repo/ui/components/ui/table";
import { formatPrice } from "@/shared/utils";

const SaleItemsSummary = ({ items }: { items: ExtendedSaleItem[] }) => {
	return (
		<ScrollArea className="m-w-[350px] h-[200px]">
			<Table>
				<TableBody>
					{items.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.product.name}</TableCell>
							<TableCell>{item.quantity}</TableCell>
							<TableCell className="text-right">
								{formatPrice(item.price)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ScrollArea>
	);
};

export default SaleItemsSummary;
