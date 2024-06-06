import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { cn } from "@/shared/utils";

const CardListSkeleton = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				"w-full p-4 space-y-4 border-gray-200 divide-y divide-gray-200 rounded-lg shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700",
				className,
			)}
		>
			<div className="flex flex-col space-y-3">
				<Skeleton className="rounded-xl w-full h-[325px]" />
				<div className="space-y-2">
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
				</div>
			</div>
			<div className="flex flex-col space-y-3">
				<Skeleton className="rounded-xl w-full h-[325px]" />
				<div className="space-y-2">
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
				</div>
			</div>
			<div className="flex flex-col space-y-3">
				<Skeleton className="rounded-xl w-full h-[325px]" />
				<div className="space-y-2">
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
				</div>
			</div>
			<div className="flex flex-col space-y-3">
				<Skeleton className="rounded-xl w-full h-[325px]" />
				<div className="space-y-2">
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
				</div>
			</div>

			<span className="sr-only">Cargando...</span>
		</div>
	);
};

export default CardListSkeleton;
