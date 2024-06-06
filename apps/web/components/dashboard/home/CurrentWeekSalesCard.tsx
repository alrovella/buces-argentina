import { compareCurrentWeekSalesWithLastWeek } from "@/actions/sales";
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

const CurrentWeekSalesCard = async () => {
	const data = await compareCurrentWeekSalesWithLastWeek();
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardDescription>Ventas de la Semana</CardDescription>
				<CardTitle className="text-4xl">
					{formatPrice(data.currentWeekTotal)}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-muted-foreground text-xs">
					{data.percentage}% comparado a la semana pasada
				</div>
			</CardContent>
			<CardFooter>
				<Progress value={data.percentage} />
			</CardFooter>
		</Card>
	);
};

export default CurrentWeekSalesCard;
