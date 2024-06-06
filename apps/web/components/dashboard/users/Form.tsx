"use client";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import type { Province, User } from "@prisma/client";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import SubmitButton from "../../shared/SubmitButton";
import { updateUser } from "@/actions/users";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/components/ui/select";

const UserForm = ({
	user,
	provinces,
}: {
	user?: User;
	provinces: Province[];
}) => {
	const [state, formAction] = useFormState(updateUser, null);

	useEffect(() => {
		if (state?.error)
			toast.error(Object.values(state.error.fieldErrors).join(", "));
	}, [state]);

	return (
		<form action={formAction} className="w-full md:w-1/2">
			<div className="gap-3 grid mb-2">
				<Label htmlFor="firstName">Nombre</Label>
				<Input
					name="firstName"
					type="text"
					className="w-full"
					defaultValue={user?.firstName ?? ""}
				/>
			</div>
			<div className="gap-3 grid mb-2">
				<Label htmlFor="lastName">Apellido</Label>
				<Input
					name="lastName"
					type="text"
					className="w-full"
					defaultValue={user?.lastName ?? ""}
				/>
			</div>
			<div className="gap-3 grid mb-2">
				<Label htmlFor="email">Email</Label>
				<Input
					name="email"
					type="email"
					className="w-full"
					defaultValue={user?.email}
				/>
			</div>
			<div className="gap-3 grid mb-2">
				<Label htmlFor="phone">Teléfono</Label>
				<Input
					name="phone"
					type="text"
					className="w-full"
					defaultValue={user?.phone ?? ""}
				/>
			</div>
			<div className="gap-3 grid mb-2">
				<Label htmlFor="address">Direccion</Label>
				<Input
					name="address"
					type="text"
					className="w-full"
					defaultValue={user?.address ?? ""}
				/>
			</div>
			<div className="gap-3 grid mb-2">
				<Label htmlFor="city">Ciudad</Label>
				<Input
					name="city"
					type="text"
					className="w-full"
					defaultValue={user?.city ?? ""}
				/>
			</div>
			<div className="gap-3 grid mb-2">
				<Label htmlFor="provinceId">Provincia</Label>
				<Select
					required
					name="provinceId"
					defaultValue={user?.provinceId ? user.provinceId.toString() : ""}
				>
					<SelectTrigger>
						<SelectValue placeholder="Seleccionar Provincia" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{provinces.map((province) => (
								<SelectItem key={province.id} value={province.id.toString()}>
									{province.name}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="gap-3 grid mb-2">
				<Label htmlFor="zipCode">Codigo Postal</Label>
				<Input
					name="zipCode"
					type="text"
					className="w-full"
					defaultValue={user?.zipCode ?? ""}
				/>
			</div>
			<div className="gap-3 grid mb-2">
				<Label htmlFor="comments">Comentarios</Label>
				<Textarea name="comments" defaultValue={user?.comments ?? ""} />
			</div>
			<SubmitButton className="w-full">
				<Save className="w-3.5 h-3.5" />
				Guardar Usuario
			</SubmitButton>
			<input type="hidden" name="id" value={user?.id} />
		</form>
	);
};
export default UserForm;
