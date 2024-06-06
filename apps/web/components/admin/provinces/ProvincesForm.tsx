"use client";
import { updateShippingCosts } from "@/actions/provinces";
import SubmitButton from "@/components/shared/SubmitButton";
import { Input } from "@repo/ui/components/ui/input";
import type { Province } from "@prisma/client";
import { useFormState } from "react-dom";

const ProvincesForm = ({ provinces }: { provinces: Province[] }) => {
	const [state, formAction] = useFormState(updateShippingCosts, null);

	return (
		<form className="mb-4" action={formAction}>
			<div className="items-center gap-3 grid grid-cols-3 mb-2">
				{provinces.map((province) => (
					<div key={province.id} className="p-2 border">
						<p>{province.name}</p>
						<Input type="hidden" name="id" defaultValue={province.id} />
						<Input
							type="number"
							name="shippingCost"
							defaultValue={province.shippingCost}
						/>
					</div>
				))}
			</div>

			<SubmitButton>Guardar</SubmitButton>
		</form>
	);
};

export default ProvincesForm;
