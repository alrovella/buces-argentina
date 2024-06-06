import type { Product, Sale, SaleItem } from "@prisma/client";
import type { ExtendedUser } from "./user";

export type ExtendedSale = Sale & {
	saleItems: ExtendedSaleItem[];
	user: ExtendedUser;
};

export type ExtendedSaleItem = SaleItem & {
	product: Product;
};
