import { SignUp } from "@clerk/nextjs";

export default function Page({
	searchParams,
}: Readonly<{
	searchParams?: {
		redirect_url?: string;
	};
}>) {
	const redirectUrl = searchParams?.redirect_url ?? "/";
	return (
		<div className="flex justify-center items-center h-[80vh]">
			<SignUp path="/sign-up" forceRedirectUrl={redirectUrl} />
		</div>
	);
}
