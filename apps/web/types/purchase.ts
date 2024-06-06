import type { Product, Sale, SaleItem } from "@prisma/client";
import type { ExtendedProduct } from "./product";

export type Purchase = Sale & {
	saleItems: PurchaseItem[];
};

export type PurchaseItem = SaleItem & {
	product: ExtendedProduct;
};
