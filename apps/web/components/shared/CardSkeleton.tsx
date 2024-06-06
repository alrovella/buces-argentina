import { cn } from "@/shared/utils";

const CardSkeleton = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				"bg-background w-full p-4 h-45 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700",
				className,
			)}
		>
			<div className="flex justify-between items-center">
				<div>
					<div className="bg-gray-300 dark:bg-gray-600 mb-2.5 rounded-full w-24 h-2.5">
						{" "}
					</div>
					<div className="bg-gray-200 dark:bg-gray-700 rounded-full w-32 h-2">
						{" "}
					</div>
				</div>
				<div className="bg-gray-300 dark:bg-gray-700 rounded-full w-12 h-2.5">
					{" "}
				</div>
			</div>
		</div>
	);
};

export default CardSkeleton;
