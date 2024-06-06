"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import BlurImage from "../shared/BlurImage";

type CarouselProps = {
	images: string[];
};

const Carousel = ({ images }: CarouselProps) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		if (images.length === 1) return;
		const timer = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000);

		return () => {
			clearInterval(timer);
		};
	}, [images]);

	return (
		<>
			<div className="border-foreground/20 shadow-md border rounded-lg w-full h-[500px]">
				<BlurImage
					width={500}
					height={500}
					src={images[currentImageIndex] ?? ""}
					alt={process.env.APP_SEO_TITLE ?? ""}
					className="rounded-md w-full h-full transition-opacity duration-1500 ease-in-out object-cover"
				/>
			</div>

			{images.length > 1 && (
				<div className="flex justify-center mt-4">
					{images.map((image, index) => (
						<button
							type="button"
							onClick={() => {
								setCurrentImageIndex(images.indexOf(image));
							}}
							key={image}
							className={twMerge(
								"w-3 h-3 mb-4 rounded-full bg-gray-300 mx-2 cursor-pointer hover:bg-gray-500",
								"transition-transform duration-200 ease-in-out hover:scale-110",
								currentImageIndex === index ? "bg-gray-500" : "bg-gray-300",
							)}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default Carousel;
