import { useFormStatus } from "react-dom";
import { Button } from "@repo/ui/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/shared/utils";
import { LABELS } from "@/shared/labels";

export const MercadoPagoButton = ({ className }: { className?: string }) => {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending}
			type="submit"
			variant="default"
			className={cn(
				"hover:bg-primary/80 text-white font-bold py-2 px-4 bg-primary",
				className,
			)}
		>
			{pending && <LoaderIcon className="mr-2 w-4 h-4 animate-spin" />}
			{pending ? LABELS.COMMON.PROCCESING : LABELS.CART.MAKE_PURCHASE}
		</Button>
	);
};
