"use client";

import Image from "next/image";

const BlurImage = ({
	src,
	width,
	height,
	alt,
	className,
	quality = 100,
}: {
	src: string;
	width: number;
	height: number;
	alt: string;
	className?: string;
	quality?: number;
}) => {
	return (
		<Image
			quality={quality}
			src={src}
			width={width}
			height={height}
			alt={alt}
			className={className}
		/>
	);
};

export default BlurImage;
