import CardSkeleton from "@/components/shared/CardSkeleton";
import CurrentMonthSalesCard from "@/components/dashboard/home/CurrentMonthSalesCard";
import CurrentWeekSalesCard from "@/components/dashboard/home/CurrentWeekSalesCard";
import { buttonVariants } from "@repo/ui/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { cn } from "@/shared/utils";
import { BoxIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
	return (
		<div className="gap-4 grid lg:grid-cols-3 mt-4">
			<Suspense fallback={<CardSkeleton className="rounded-lg w-full" />}>
				<Card>
					<CardHeader className="pb-2">
						<CardDescription>Administra tus productos</CardDescription>
						<CardTitle>Productos</CardTitle>
					</CardHeader>
					<CardContent className="pt-5">
						<Link
							href="/admin/productos"
							className={cn(
								buttonVariants({ variant: "default" }),
								"flex items-center gap-2",
								"w-full sm:w-fit",
							)}
						>
							<BoxIcon className="w-4 h-4" />
							Administrar Productos
						</Link>
					</CardContent>
				</Card>
			</Suspense>
			<Suspense fallback={<CardSkeleton className="rounded-lg w-full" />}>
				<CurrentMonthSalesCard />
			</Suspense>
			<Suspense fallback={<CardSkeleton className="rounded-lg w-full" />}>
				<CurrentWeekSalesCard />
			</Suspense>
		</div>
	);
}
