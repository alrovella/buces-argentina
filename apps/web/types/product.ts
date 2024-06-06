import { Category, Product, ProductImage } from "@prisma/client";

export type ExtendedProduct = Product & {
  images: ProductImage[];
  category: Category;
};

export type CartProduct = Product & {
  images: ProductImage[];
  category: { name: string };
  quantity: number;
  total: number;
};

export type CheckoutProduct = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
};
