/// post next api route

import { getAllProvinces } from "@/actions/provinces";
import { addUser } from "@/actions/users";
import type { WebhookEvent } from "@clerk/nextjs/server";
import type { User } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
	const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!CLERK_WEBHOOK_SECRET) {
		throw new Error("CLERK_WEBHOOK_SECRET is not defined");
	}

	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return NextResponse.json(
			{ error: "Missing required svix headers" },
			{ status: 400 },
		);
	}

	const payload = await req.json();
	const body = JSON.stringify(payload);
	const wh = new Webhook(CLERK_WEBHOOK_SECRET);

	let evt: WebhookEvent;

	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		return NextResponse.json(
			{ error: "Error Verifying webhook" },
			{ status: 400 },
		);
	}

	const eventType = evt.type;

	if (eventType === "user.created") {
		const { id, email_addresses, first_name, last_name } = evt.data;

		if (!id || !email_addresses) {
			return NextResponse.json(
				{ error: "Error occurred: missing required fields" },
				{ status: 400 },
			);
		}

		const user = {
			clerkId: id,
			firstName: first_name,
			lastName: last_name,
			email: email_addresses[0]?.email_address,
			provinceId: (await getAllProvinces()).at(0)?.id,
		};

		try {
			await addUser(user as User);
		} catch (err) {
			return NextResponse.json({ error: "Error adding user" }, { status: 400 });
		}
	}

	return NextResponse.json({ status: 200 });
}
