"use client";

import {
	addProductImage,
	removeProductImage,
	uploadImages,
} from "@/actions/products";
import { Button } from "@repo/ui/components/ui/button";
import { Card } from "@repo/ui/components/ui/card";
import { Progress } from "@repo/ui/components/ui/progress";
import { useEdgeStore } from "@/providers/edgeStore";
import { cn } from "@/shared/utils";
import type { ExtendedProduct } from "@/types/product";
import type { ProductImage } from "@prisma/client";
import { TrashIcon, Upload } from "lucide-react";
import { useRef, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import BlurImage from "@/components/shared/BlurImage";

export default function ProductImages({
	product,
}: Readonly<{ product: ExtendedProduct }>) {
	const [dragActive, setDragActive] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<File[]>([]);
	const [uploading, setUploading] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function handleChange(e: any) {
		e.preventDefault();
		if (e.target.files && e.target.files.length > 0) {
			for (const element of e.target.files) {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				setFiles((prevState: any) => [...prevState, element]);
			}
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function handleDrop(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			for (let i = 0; i < e.dataTransfer.file.length; i++) {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
			}
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function handleDragLeave(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function handleDragOver(e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	function handleDragEnter(e: any) {
		handleDragOver(e);
	}

	function removeFile(idx: number) {
		const newArr = [...files];
		newArr.splice(idx, 1);
		setFiles([]);
		setFiles(newArr);
	}

	function openFileExplorer() {
		if (inputRef.current) inputRef.current.value = "";
		inputRef.current?.click();
	}

	const { edgestore } = useEdgeStore();

	const handleUpload = async () => {
		// biome-ignore lint/complexity/noForEach: <explanation>
		files.forEach(async (file: File) => {
			const res = await edgestore.publicFiles.upload({
				file,

				onProgressChange: (progress) => {
					setProgress(progress);
					setUploading(true);
				},
			});
			addProductImage(product.id, res.url);
			setUploading(false);
		});

		setFiles([]);
	};

	const handleDeleteImage = async (image: ProductImage) => {
		await removeProductImage(product.id, image.id).then(async () => {
			await edgestore.publicFiles.delete({
				url: image.url,
			});
		});
	};

	return (
		<>
			{!uploading && (
				<Card className="gap-2 grid grid-cols-2 md:grid-cols-3 mb-2 p-2 h-[400px] overflow-auto !scroll-smooth scrollbar-thin">
					{product.images.length === 0 && (
						<div className="p-2 text-destructive">No hay imagenes</div>
					)}
					{product.images.map((image: ProductImage) => (
						<div className="relative group" key={image.id}>
							<BlurImage
								src={image.url}
								width={200}
								className={cn(
									"hover:opacity-90 shadow-sm border w-full h-48 object-cover",
								)}
								height={200}
								alt={image.url}
							/>
							<div className="group-hover:visible top-0 right-0 absolute pt-2 pr-2 invisible">
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											variant="destructive"
											size="icon"
											disabled={uploading}
											className="w-6 h-6"
											type="button"
										>
											<TrashIcon className="w-4 h-4" />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Eliminar Imagen</AlertDialogTitle>
											<AlertDialogDescription>
												Seguro de eliminar la imagen del producto?
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancelar</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => handleDeleteImage(image)}
											>
												Eliminar
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>
					))}
				</Card>
			)}

			<Card
				className={cn(
					dragActive ? "bg-secondary" : "bg-background",
					"p-4 text-sm text-center",
				)}
				onDragEnter={handleDragEnter}
				onDrop={handleDrop}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
			>
				{uploading ? (
					<div className="flex flex-col justify-center items-center">
						<p className="font-bold text-lg">{progress}%</p>
						<Progress value={progress} />
						<p className="text-sm">Subiendo Imágenes</p>
					</div>
				) : (
					<form action={uploadImages}>
						<input
							placeholder="fileInput"
							name="images"
							className="hidden"
							ref={inputRef}
							type="file"
							multiple={true}
							onChange={handleChange}
							accept="image/*"
						/>
						<Upload className="mx-auto mb-4 w-8 h-8" />
						<p>
							Arrastra y suelta o
							<br />
							<Button type="button" variant="link" onClick={openFileExplorer}>
								selecciona Imágenes
							</Button>
							<br />
							para subir
						</p>
						<div className="mt-2">
							{files.map((file: File, idx: number) => (
								<div
									key={file.name}
									className="items-center grid grid-cols-3 p-3 border w-full"
								>
									<span className="flex justify-start">{file.name}</span>
									<span>{file.size} bytes</span>
									<span className="flex justify-end">
										<Button
											variant="destructive"
											size="icon"
											className="w-6 h-6"
											type="button"
											onClick={() => removeFile(idx)}
										>
											<TrashIcon className="w-4 h-4" />
										</Button>
									</span>
								</div>
							))}
						</div>
						<input
							type="hidden"
							name="productId"
							value={product.id.toString()}
						/>
						<Button
							type="button"
							onClick={handleUpload}
							variant="default"
							className="mt-3"
							disabled={files.length === 0 || uploading}
						>
							<span className="p-2 text-white">Subir Imagenes</span>
						</Button>
					</form>
				)}
			</Card>
		</>
	);
}
