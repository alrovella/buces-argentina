import { getAllUsers } from "@/actions/users";
import { buttonVariants } from "@repo/ui/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/components/ui/table";
import { Edit } from "lucide-react";
import Link from "next/link";

const UserList = async () => {
	const users = await getAllUsers();

	return (
		<>
			{users.length === 0 && (
				<p className="p-2 text-destructive">No hay usuarios disponibles</p>
			)}
			{users.length > 0 && (
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-muted/0">
							<TableHead>Nombre</TableHead>
							<TableHead>Apellido</TableHead>
							<TableHead>Email</TableHead>
							<TableHead> </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">{user.firstName}</TableCell>
								<TableCell className="font-medium">{user.lastName}</TableCell>
								<TableCell className="font-medium">{user.email}</TableCell>
								<TableCell className="flex justify-end gap-1">
									<Link
										className={buttonVariants({
											variant: "outline",
											size: "sm",
										})}
										href={`/admin/usuarios/${user.id}/info`}
									>
										<Edit className="w-4 h-4" />
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</>
	);
};

export default UserList;
