import { cn } from "@/shared/utils";

const ListSkeleton = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				"w-full p-4 space-y-4 border-gray-200 divide-y divide-gray-200 rounded-lg shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700",
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
			<div className="flex justify-between items-center pt-4">
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
			<div className="flex justify-between items-center pt-4">
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
			<div className="flex justify-between items-center pt-4">
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
			<div className="flex justify-between items-center pt-4">
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
			<span className="sr-only">Cargando...</span>
		</div>
	);
};

export default ListSkeleton;
