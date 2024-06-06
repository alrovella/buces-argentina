import { Button } from "@repo/ui/components/ui/button";
import { cn } from "@/shared/utils";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends React.HTMLProps<HTMLButtonElement> {}

const SubmitButton = ({ children, className, ...rest }: SubmitButtonProps) => {
	const { pending } = useFormStatus();
	return (
		<Button
			{...rest}
			type="submit"
			size="xs"
			disabled={pending}
			className={cn(
				"gap-1 bg-primary flex items-center text-background py-2 px-3 rounded-sm text-sm w-full md:w-fit",
				className,
			)}
		>
			{children}
		</Button>
	);
};

export default SubmitButton;
