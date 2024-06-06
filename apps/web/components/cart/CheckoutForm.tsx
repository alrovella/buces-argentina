"use client";

import { useFormState } from "react-dom";
import { checkOut } from "@/actions/cart";
import type { Province } from "@prisma/client";
import ShippingInfo from "./ShippingInfo";
import CartSummary from "./CartSummary";

const CheckoutForm = ({ provinces }: { provinces: Province[] }) => {
	const [state, formAction] = useFormState(checkOut, null);

	return (
		<form className="gap-2 grid grid-cols-1 md:grid-cols-2" action={formAction}>
			<ShippingInfo provinces={provinces} />
			<CartSummary />
		</form>
	);
};
export default CheckoutForm;
