import { buttonVariants } from "@repo/ui/components/ui/button";
import { formatPrice, formatDate } from "@/shared/utils";
import type { Purchase } from "@/types/purchase";
import Link from "next/link";

const MyPurchasesList = ({ purchases }: { purchases: Purchase[] }) => {
	return (
		<div className="gap-6 grid">
			{purchases.map((purchase) => (
				<div
					key={purchase.id}
					className="dark:border-gray-800 shadow-sm border rounded-lg"
				>
					<div className="dark:border-gray-800 p-4 border-b">
						<div className="flex justify-between items-center">
							<div className="font-medium">#{purchase.id}</div>
							<div className="text-gray-500 text-sm dark:text-gray-400">
								{formatDate(purchase.createdAt)}
							</div>
						</div>
					</div>
					<div className="p-4">
						<div className="gap-2 grid">
							{purchase.saleItems.map((item) => (
								<div
									key={item.id}
									className="flex justify-between items-center"
								>
									<div>
										<div className="font-medium text-sm">
											{item.product.category.name}
										</div>
										<h3 className="font-bold">{item.product.name}</h3>
										<div className="text-gray-500 text-sm dark:text-gray-400">
											Cantidad: {item.quantity}
										</div>
									</div>
									<div className="font-medium">{formatPrice(item.price)}</div>
								</div>
							))}
						</div>
						<div className="flex justify-between items-center mt-4">
							<div className="text-gray-500 text-sm dark:text-gray-400">
								Total: {formatPrice(purchase.total)}
							</div>
							<Link
								className={buttonVariants({ size: "sm", variant: "outline" })}
								href={`/mis-compras/${purchase.id}/info`}
							>
								Ver Detalles
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default MyPurchasesList;
