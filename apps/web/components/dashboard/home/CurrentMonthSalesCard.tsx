import { compareCurrentMonthSalesWithLastMonth } from "@/actions/sales";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";
import { formatPrice } from "@/shared/utils";

const CurrentMonthSalesCard = async () => {
	const data = await compareCurrentMonthSalesWithLastMonth();
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardDescription>Ventas del Mes</CardDescription>
				<CardTitle className="text-4xl">
					{formatPrice(data.currentMonthTotal)}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-muted-foreground text-xs">
					{data.percentage}% comparado al mes pasado
				</div>
			</CardContent>
			<CardFooter>
				<Progress value={data.percentage} />
			</CardFooter>
		</Card>
	);
};

export default CurrentMonthSalesCard;
