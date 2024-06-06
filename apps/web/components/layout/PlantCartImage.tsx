import Image from "next/image";
import plantCart from "../../public/plant-cart.png";

const PlantCartImage = () => {
  return (
    <Image
      width={200}
      height={200}
      src={plantCart}
      placeholder="empty"
      alt="carrito con plantas"
      className="select-none size-52"
    />
  );
};
export default PlantCartImage;
