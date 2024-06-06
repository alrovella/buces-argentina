import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.saleItem.deleteMany();
	await prisma.sale.deleteMany();
	await prisma.productImage.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();
	await prisma.discountCoupon.deleteMany();

	//create admin user
	const userExists = await prisma.user.findUnique({
		where: {
			clerkId: process.env.CLERK_ADMIN_ID ?? "",
		},
	});

	if (!userExists) {
		await prisma.user.create({
			data: {
				clerkId: process.env.CLERK_ADMIN_ID ?? "",
				firstName: "Administrador",
				lastName: "Administrador",
				email: process.env.APP_EMAIL ?? "",
				provinceId: 6,
			},
		});
	}

	// create discount coupon
	await prisma.discountCoupon.create({
		data: {
			code: "DESCUENTO10",
			discount: 10,
			validUntil: new Date("2025-12-31"),
		},
	});

	await prisma.discountCoupon.create({
		data: {
			code: "D95",
			discount: 95,
			validUntil: new Date("2025-12-31"),
		},
	});

	//create category

	const bucesDescription =
		"Las Bucephalandras son plantas epífitas endémicas de la isla de Borneo. Son plantas acuáticas raras con una apariencia única. En general, las Bucephalandras son de crecimiento lento y están disponibles en muchos tipos y colores diferentes. Una planta de acuario muy tolerante que crece bien con una amplia gama de parámetros de agua.";
	const anubiasDescription =
		"Las Anubias son crecimiento lento. Ideal para acuarios Low-Tech dado a que no necesita Co2. Suele utilizarse en cubos pequeños, preferiblemente para la zona frontal, dado a que por su tamaño, puede perderse en mayores dimensiones. ";

	const bucephalandrasCategory = await prisma.category.create({
		data: {
			name: "Bucephalandras",
			description: bucesDescription,
		},
	});

	const anubiasCategory = await prisma.category.create({
		data: {
			name: "Anubias",
			description: anubiasDescription,
		},
	});

	// create products based on category

	await prisma.product.create({
		data: {
			name: "Anubias Nana",
			price: 12000,
			categoryId: anubiasCategory.id,
			inStock: true,
			keywords: "bajos requerimientos, hojas verde claro",
			isNew: true,
			description:
				"La Anubias Nana es una planta acuática popular en acuarios debido a su tamaño compacto y fácil mantenimiento.\nOriginaria de África Occidental, esta variedad de Anubias crece lentamente y es ideal para decorar pequeños acuarios o para crear paisajes naturales en acuarios más grandes. \nSus hojas verde oscuro y gruesas son resistentes y proporcionan refugio para peces pequeños y camarones. \nLa Anubias Nana Petite no requiere una iluminación intensa y puede crecer bien atada a rocas o madera. \nEs una excelente opción para principiantes en la acuarofilia debido a su robustez y adaptabilidad.\n\nEl precio incluye un rizoma de 6 hojas aproximadamente.",
			images: {
				create: {
					url: "anubia-nana-petite.jpg",
				},
			},
		},
	});
	await prisma.product.create({
		data: {
			name: "Kedagang Red",
			price: 22000,
			keywords:
				"bajos requerimientos, hojas brillantes, color verde oscuro, color rojizo",
			categoryId: bucephalandrasCategory.id,
			inStock: false,
			isNew: false,
			description:
				"La Bucephalandra Kedagang Red es una planta acuática exótica y atractiva que ha ganado popularidad en los acuarios de agua dulce.\nOriginaria de Borneo, esta planta presenta hojas gruesas y brillantes de color verde oscuro a rojo intenso, dependiendo de las condiciones de luz y nutrientes. \nSu crecimiento es lento, lo que la hace ideal para acuarios de tamaño pequeño a mediano, y se adapta bien a entornos de agua dulce con iluminación moderada a alta.\nLa Bucephalandra Kedagang Red añade un toque de color y elegancia a cualquier acuario y es una excelente opción para los aficionados que buscan una planta de bajo mantenimiento con un impacto visual impresionante.\n\nEl precio incluye un rizoma de 6 hojas aproximadamente.",
			images: {
				create: {
					url: "kedagang_01.jpg",
				},
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Brownie Blue",
			price: 18000,
			categoryId: bucephalandrasCategory.id,
			inStock: true,
			keywords:
				"bajos requerimientos, hojas brillantes, color marron, color azul",
			isNew: true,
			description:
				"La Bucephalandra Brownie Blue es una variante fascinante de esta planta acuática originaria de Borneo.\nCon hojas gruesas y brillantes que pueden variar en tonos de marrón y azul, esta variedad agrega un toque único y vibrante a cualquier acuario de agua dulce.\nAl igual que otras bucephalandras, crece lentamente y es ideal para acuarios de tamaño pequeño a mediano con iluminación moderada a alta.\nSu resistencia y adaptabilidad la convierten en una excelente opción para aquellos que buscan una planta llamativa pero de bajo mantenimiento.\nLa Bucephalandra Brownie Blue es una joya para cualquier aficionado a los acuarios que busca agregar belleza y color a su paisaje acuático.\n\nEl precio incluye un rizoma de 6 hojas aproximadamente.\n\nEl precio incluye un rizoma de 6 hojas aproximadamente.",
			images: {
				createMany: {
					data: [
						{
							url: "brownie_blue_01.jpg",
						},
						{
							url: "brownie_blue_02.jpg",
						},
					],
				},
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Ghost Catherine",
			keywords: "bajos requerimientos, hojas finas, serrucho, verde oscuro",
			price: 20000,
			categoryId: bucephalandrasCategory.id,
			inStock: true,
			isNew: false,
			description:
				"La variedad de Bucephalandra Catherine es una opción poco común en el mundo del acuarismo debido a sus atractivas hojas con forma de serrucho y pueden variar en tonos de verde oscuro a verde claro.\nSuele ser una planta de crecimiento lento, lo que la hace ideal para acuarios de tamaño pequeño a mediano.\nAdemás, la Bucephalandra Catherine es conocida por ser resistente y adaptable a una variedad de condiciones de agua y luz.\nEs una excelente opción para aquellos que buscan agregar un toque de belleza natural a su acuario con una planta de bajo mantenimiento.\n\nEl precio incluye un rizoma de 6 hojas aproximadamente.",
			images: {
				createMany: {
					data: [
						{
							url: "ghost_catherine_01.jpg",
						},
					],
				},
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Wavy green",
			keywords: "bajos requerimientos, hojas onduladas, verde vibrante",
			price: 15000,
			categoryId: bucephalandrasCategory.id,
			inStock: true,
			isNew: false,
			description:
				"La Wavy Green es apreciada por su distintivo patrón de hojas onduladas y su color verde vibrante.\nEsta variante añade un aspecto único y atractivo a cualquier acuario de agua dulce.\nLas hojas suelen ser gruesas y tienen un contorno ondulado, lo que le da a la planta una apariencia distintiva en comparación con otras variedades de Bucephalandra.\nAdemás de su atractivo estético, la Bucephalandra Wavy Green es una planta resistente y de crecimiento lento, lo que la convierte en una excelente opción para acuaristas de todos los niveles de experiencia.\nCon los cuidados adecuados y las condiciones adecuadas, esta variedad puede prosperar y añadir un toque de frescura y vitalidad a cualquier paisaje acuático.\n\nEl precio incluye un rizoma de 6 hojas aproximadamente.",
			images: {
				create: {
					url: "wave_green_01.jpg",
				},
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Pink Martini",
			keywords: "pink, martini, bucephalandra, pink martini, rosa",
			price: 25000,
			categoryId: bucephalandrasCategory.id,
			inStock: false,
			isNew: false,
			description: `${bucesDescription}.\n\nEl precio incluye un rizoma de 6 hojas aproximadamente.`,
			images: {
				createMany: {
					data: [
						{
							url: "pink_martini_01.jpg",
						},
					],
				},
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Skeleton King",
			price: 25000,
			keywords: "skeleton king, dark achilles, color rosado",
			categoryId: bucephalandrasCategory.id,
			inStock: false,
			isNew: false,
			description:
				"También conocida como Dark Achilles, se caracteriza por su apariencia distintiva similar a un esqueleto, con hojas delgadas.\nLas nuevas hojas muestran una coloración rosa profundo a rojo que se oscurece a medida que maduran.\nEs un espécimen verdaderamente sorprendente y un artículo de colección muy buscado por los acuascapers.\nLa Skeleton King puede crecer tanto sumergida como emergida, aunque algunos informan una ligera pérdida de hojas cuando está sumergida.\nSu crecimiento es muy lento, con nuevas hojas brotando desde el rizoma base.\n\nEl precio incluye un rizoma de 6 hojas aproximadamente.",
			images: {
				create: {
					url: "skeleton_king_01.jpg",
				},
			},
		},
	});

	await prisma.product.create({
		data: {
			name: "Aridarum",
			price: 25000,
			categoryId: bucephalandrasCategory.id,
			keywords: "aridarum, hojas lisas, hojas largas, color verde claro",
			inStock: false,
			isNew: false,
			description:
				"Aridarum es un género de plantas con flores perteneciente a la familia Araceae. Todas las especies conocidas en este género son rheofíticas y se encuentran principalmente en la isla de Borneo. Estas plantas son acuáticas y tienen hojas en forma de sauce que pueden soportar fuertes corrientes sin sufrir daños.\n\nEl precio incluye un rizoma de 6 hojas aproximadamente.",
			images: {
				create: {
					url: "aridarum_01.jpg",
				},
			},
		},
	});

	await prisma.province.createMany({
		data: [
			{
				name: "Buenos Aires",
				shippingCost: 6000,
			},
			{
				name: "Capital Federal",
				shippingCost: 6000,
			},
			{
				name: "Catamarca",
				shippingCost: 6000,
			},
			{
				name: "Chaco",
				shippingCost: 8000,
			},
			{
				name: "Chubut",
				shippingCost: 10000,
			},
			{
				name: "Cordoba",
				shippingCost: 0,
			},
			{
				name: "Corrientes",
				shippingCost: 8000,
			},
			{
				name: "Entre Rios",
				shippingCost: 5000,
			},
			{
				name: "Formosa",
				shippingCost: 8000,
			},
			{
				name: "Jujuy",
				shippingCost: 8000,
			},
			{
				name: "La Pampa",
				shippingCost: 6000,
			},
			{
				name: "La Rioja",
				shippingCost: 6000,
			},
			{
				name: "Mendoza",
				shippingCost: 6000,
			},
			{
				name: "Misiones",
				shippingCost: 10000,
			},
			{
				name: "Neuquen",
				shippingCost: 8000,
			},
			{
				name: "Rio Negro",
				shippingCost: 8000,
			},
			{
				name: "Salta",
				shippingCost: 8000,
			},
			{
				name: "San Juan",
				shippingCost: 5000,
			},
			{
				name: "San Luis",
				shippingCost: 6000,
			},
			{
				name: "Santa Cruz",
				shippingCost: 10000,
			},
			{
				name: "Santa Fe",
				shippingCost: 5000,
			},
			{
				name: "Santiago del Estero",
				shippingCost: 6000,
			},
			{
				name: "Tierra del Fuego",
				shippingCost: 10000,
			},
			{
				name: "Tucuman",
				shippingCost: 6000,
			},
		],
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
