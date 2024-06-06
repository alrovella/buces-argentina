import type { ExtendedProduct } from "@/types/product";
import ProductCard from "./ProductCard";
import Link from "next/link";
import PlantCartImage from "../layout/PlantCartImage";

const ProductList = async ({ products }: { products: ExtendedProduct[] }) => {
  return products?.length > 0 ? (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center mx-auto mb-8 p-4 w-full sm:w-1/2">
      <PlantCartImage />
      <h3 className="font-bold text-2xl text-center">
        No hay productos relacionados con esa categoría
      </h3>
      <Link href="/" className="mt-4">
        Volver al inicio
      </Link>
    </div>
  );
};

export default ProductList;
