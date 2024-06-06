/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import loadingAnitation from "../public/spinner.gif";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh]">
      <Image src={loadingAnitation} alt="" className="w-32 h-32" />
    </div>
  );
};

export default Loading;
