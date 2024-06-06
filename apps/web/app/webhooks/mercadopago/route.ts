/// post next api route

import { createSale } from "@/actions/sales";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // const headerPayload = headers();
  //TODO: continue creating webhook signature is valid logic
  await createSale(body.data.id, true);

  return NextResponse.json({ status: 200 });
}
