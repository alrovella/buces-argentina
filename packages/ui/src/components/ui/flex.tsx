import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@repo/ui/lib/utils";

const flexVariants = cva("flex items-center", {
	variants: {
		variant: {
			row: "flex-row",
			col: "flex-col",
		},
		gap: {
			default: "gap-0",
			sm: "gap-1",
			md: "gap-2",
			lg: "gap-4",
		},
		justify: {
			start: "justify-start",
			end: "justify-end",
			center: "justify-center",
			between: "justify-between",
			around: "justify-around",
			evenly: "justify-evenly",
		},
	},
	defaultVariants: {
		variant: "row",
		gap: "default",
		justify: "start",
	},
});

export interface FlexProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof flexVariants> {}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
	({ className, variant, gap, justify, ...props }, ref) => (
		<div
			className={cn(flexVariants({ variant, gap, justify, className }))}
			ref={ref}
			{...props}
		/>
	),
);

Flex.displayName = "Flex";

export { Flex };
