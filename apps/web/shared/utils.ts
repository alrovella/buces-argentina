import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDate = (date?: Date) => {
	return date
		? date.toLocaleDateString("es-AR", {
				month: "numeric",
				day: "numeric",
				year: "numeric",
			})
		: new Date().toLocaleDateString("es-AR", {
				month: "numeric",
				day: "numeric",
				year: "numeric",
			});
};

export const formatPrice = (number: number) => {
	const ARFormat = new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	});
	return ARFormat.format(number);
};
