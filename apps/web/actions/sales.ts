"use server";
import db from "@repo/database/client";
import type { SaleItem } from "@repo/database/client";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { Resend } from "resend";
import { ThanksTemplate } from "@/components/email-templates/thanks";
import { getDiscountCouponById } from "./discountCoupons";

const client = new MercadoPagoConfig({
	accessToken: process.env.MP_ACCESS_TOKEN ?? "",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getSaleByPaymentId(paymentId: string) {
	const sale = await db.sale.findUnique({
		where: { paymentId },
	});
	return sale;
}

export async function createSale(paymentId: string, sendEmail = false) {
	if (!process.env.MP_WEBHOOK_KEY) throw new Error("Missing MP_WEBHOOK_KEY");

	const payment = await new Payment(client).get({ id: paymentId });

	if (!payment) return;

	const saleExists = await getSaleByPaymentId(paymentId);
	if (saleExists) return;

	const discountCoupon = await getDiscountCouponById(
		Number(payment.metadata?.discount_coupon_id ?? 0),
	);

	try {
		const saleItems = payment.additional_info?.items?.map(
			(item) =>
				({
					productId: Number(item.id),
					quantity: Number(item.quantity),
					price: Number(item.unit_price),
					total: Number(item.unit_price * item.quantity),
				}) as SaleItem,
		);

		const sale = await db.sale.create({
			data: {
				paymentId,
				subTotal:
					saleItems?.reduce(
						(acc, item) => acc + item.price * item.quantity,
						0,
					) ?? 0,
				shippingCost: Number(payment.shipping_amount ?? 0),
				total:
					(saleItems?.reduce(
						(acc, item) => acc + item.price * item.quantity,
						0,
					) ?? 0) + Number(payment.shipping_amount ?? 0),
				discountCouponId: discountCoupon?.id,
				paymentFee: Number(payment.fee_details?.at(0)?.amount ?? 0),
				userId: Number(payment.metadata.user_id),
				saleItems: {
					create: saleItems,
				},
			},
		});

		if (sendEmail && sale) sendSaleEmail(Number(sale.id));

		return sale;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function sendSaleEmail(saleId: number) {
	const sale = await db.sale.findUnique({ where: { id: saleId } });
	const user = await db.user.findUnique({ where: { id: sale?.userId } });
	if (!user) return;
	if (!sale) return;

	const products = await db.saleItem.findMany({
		where: { saleId: sale.id },
		include: { product: true },
	});

	const province = await db.province.findUnique({
		where: { id: user.provinceId ?? undefined },
	});

	resend.emails.send({
		from: `${process.env.APP_NAME} <onboarding@resend.dev>`,
		to: user.email,
		bcc: process.env.APP_EMAIL ?? "",
		subject: `Gracias por comprar en ${process.env.APP_NAME}!`,
		text: "",
		react: ThanksTemplate({
			firstName: user.firstName ?? "",
			lastName: user.lastName ?? "",
			email: user.email,
			phone: user.phone ?? "",
			address: user.address ?? "",
			comments: user.comments ?? "",
			city: user.city ?? "",
			province: province?.name,
			zipCode: user.zipCode ?? "",
			saleItems: products,
			saleId: Number(sale.id),
			paymentId: sale.paymentId,
		}),
	});
}

export const getSaleById = async (id: number) => {
	const sale = await db.sale.findUnique({
		include: {
			user: {
				include: {
					province: true,
				},
			},
			saleItems: {
				include: { product: true },
			},
		},
		where: { id },
	});
	return sale;
};

export const getAllSales = async (
	from: string | undefined,
	to: string | undefined,
	page = 1,
	limit = 10,
) => {
	const data = await db.sale.findMany({
		take: limit,
		skip: (page - 1) * limit,
		orderBy: {
			createdAt: "desc",
		},
		where: {
			createdAt: {
				gte: from ? new Date(from) : new Date(0),
				lt: to ? new Date(to) : new Date(),
			},
		},
		include: {
			user: true,
			saleItems: {
				include: { product: true },
			},
		},
	});
	return data;
};

export const CurrentMonthSales = async () => {
	const data = await db.sale.findMany({
		where: {
			createdAt: {
				gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
				lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
			},
		},
	});
	return data;
};

export const compareCurrentMonthSalesWithLastMonth = async () => {
	const currentMonthSales = await compareSalesFromDates(
		new Date(new Date().getFullYear(), new Date().getMonth(), 1),
		new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
	);

	const lastMonthSales = await compareSalesFromDates(
		new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
		new Date(new Date().getFullYear(), new Date().getMonth(), 0),
	);

	let percentage = Math.round(
		((currentMonthSales.total - lastMonthSales.total) / lastMonthSales.total) *
			100,
	);

	if (Number.isNaN(percentage)) percentage = 0;
	if (lastMonthSales.total === 0) percentage = 0;

	if (lastMonthSales.total === 0 && currentMonthSales.total > 0)
		percentage = 100;

	return {
		currentMonthTotal: currentMonthSales.total,
		percentage,
	};
};

export const compareCurrentWeekSalesWithLastWeek = async () => {
	const currentFromDate = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate() - 7,
	);
	const currentToDate = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate() + 1,
	);

	const lastFromDate = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate() - 14,
	);

	const lastToDate = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate() - 6,
	);

	const currentWeekSales = await compareSalesFromDates(
		currentFromDate,
		currentToDate,
	);

	const lastWeekSales = await compareSalesFromDates(lastFromDate, lastToDate);

	let percentage = Math.round(
		((currentWeekSales.total - lastWeekSales.total) / lastWeekSales.total) *
			100,
	);

	if (Number.isNaN(percentage)) percentage = 0;
	if (lastWeekSales.total === 0) percentage = 0;

	if (lastWeekSales.total === 0 && currentWeekSales.total > 0) percentage = 100;

	return {
		currentWeekTotal: currentWeekSales.total,
		percentage,
	};
};
export const compareSalesFromDates = async (startDate: Date, endDate: Date) => {
	const data = await db.sale.findMany({
		include: { saleItems: true },
		where: {
			createdAt: {
				gte: startDate,
				lt: endDate,
			},
		},
	});

	const total = data.reduce(
		(acc, sale) =>
			acc +
			sale.saleItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
		0,
	);

	return { data, total };
};
