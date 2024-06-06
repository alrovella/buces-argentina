import type { User } from "@prisma/client";

export type ExtendedUser = User & {
	province: { name: string };
};
