import Link from "next/link";
import { buttonVariants } from "@repo/ui/components/ui/button";

const KeywordsLink = ({ keywords }: { keywords: string }) => {
	const keywordsList = keywords.split(",");
	return (
		<div className="flex md:flex-row flex-col flex-wrap justify-start items-start w-full">
			{keywordsList.map((keyword) => (
				<Link
					className={buttonVariants({ variant: "link" })}
					href={`/productos/buscar?q=${keyword.trim()}`}
					key={keyword}
				>
					{keyword.trim()}
				</Link>
			))}
		</div>
	);
};

export default KeywordsLink;
