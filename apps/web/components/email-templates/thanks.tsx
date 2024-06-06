import { formatPrice } from "@/shared/utils";
import type { ExtendedSaleItem } from "@/types/sale";

interface EmailTemplateProps {
	paymentId: string;
	firstName?: string;
	lastName?: string;
	email: string;
	phone?: string;
	address: string;
	city: string;
	province?: string;
	zipCode: string;
	saleItems?: ExtendedSaleItem[];
	comments?: string;
	saleId: number;
}

export const ThanksTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	paymentId,
	firstName,
	lastName,
	email,
	phone,
	comments,
	address,
	city,
	province,
	zipCode,
	saleItems,
	saleId,
}) => {
	return (
		<main>
			<h1>
				Gracias por comprar en {process.env.APP_NAME}, {firstName}!
			</h1>
			<p>
				Recibimos tu compra correctamente. Vamos a chequear tu pedido, tus datos
				y tu pago, para luego proceder con el envío.
			</p>
			<p>
				Los envíos se realizan por Correo Argentino y el pago por Mercado Pago
			</p>

			<p>Estos son tus datos:</p>
			<section className="border divide-y">
				<div className="flex p-2 border-b">
					<strong className="w-1/3">Nombre:</strong>{" "}
					<span className="w-2/3">{firstName}</span>
				</div>
				<div className="flex p-2 border-b">
					<strong className="w-1/3">Apellido:</strong>{" "}
					<span className="w-2/3">{lastName}</span>
				</div>
				<div className="flex p-2 border-b">
					<strong className="w-1/3">Email:</strong>{" "}
					<span className="w-2/3">{email}</span>
				</div>
				<div className="flex p-2 border-b">
					<strong className="w-1/3">Teléfono:</strong>{" "}
					<span className="w-2/3">{phone}</span>
				</div>
				<div className="flex p-2 border-b">
					<strong className="w-1/3">Dirección:</strong>{" "}
					<span className="w-2/3">{address}</span>
				</div>
				<div className="flex p-2 border-b">
					<strong className="w-1/3">Ciudad:</strong>{" "}
					<span className="w-2/3">{city}</span>
				</div>
				<div className="flex p-2 border-b">
					<strong className="w-1/3">Provincia:</strong>{" "}
					<span className="w-2/3">{province}</span>
				</div>
				<div className="flex p-2 border-b">
					<strong className="w-1/3">Código Postal:</strong>{" "}
					<span className="w-2/3">{zipCode}</span>
				</div>
				<div className="flex p-2 border-b">
					<strong className="w-1/3">Comentarios:</strong>{" "}
					<span className="w-2/3">{comments ?? "Ninguno"}</span>
				</div>
			</section>
			<section>
				<h3>Productos Comprados</h3>
				{saleItems?.map((saleItem, index) => (
					<div key={saleItem.id} className="flex p-2 border divide-x">
						<div className="w-1/2">
							<strong>Producto:</strong> {saleItem.product.name}
						</div>
						<div className="w-1/4">
							<strong>Cantidad:</strong> {saleItem.quantity}
						</div>
						<div className="w-1/4">
							<strong>Total:</strong> ${formatPrice(saleItem.total)}
						</div>
					</div>
				))}
				<h2>
					Total Pagado
					{formatPrice(
						saleItems?.reduce((acc, curr) => acc + curr.total, 0) ?? 0,
					)}
				</h2>
			</section>
			<section>
				<p>
					IMPORTANTE: Los envíos se realizan los dias lunes para evitar demoras
					en las entregas y que las plantas lleguen sanas.
					<br />
					Si algun dato de tu pedido lo completaste con errores o por cualquier
					otra cosa, comunicate a{" "}
					<a href={`mailto:${process.env.APP_EMAIL}`}>
						{process.env.APP_EMAIL}
					</a>
				</p>
				<p>
					Id de Venta/Pago: {saleId}-{paymentId}
				</p>
			</section>
		</main>
	);
};
