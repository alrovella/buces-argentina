import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatPrice = (number: number) => {
	const ARFormat = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	});
	return ARFormat.format(number);
};
