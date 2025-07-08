import { FaGasPump, FaUsers, FaCogs, FaCarSide } from "react-icons/fa";
import car1 from "../../assets/images/CarCard.png";
import utils from "../../utils/utils";

const CarCard = ({ car }) => {
  const carData = {
    image: car.picture?.picture?.[0]?.trim()
      ? `${utils.BASE_URL_MEDIA}${car.picture.picture[0]}`
      : car1,
    name: car.brand?.name || car.name.split("|")[0]?.trim() || "Car",
    subname:
      car.name.split("|").slice(1).join("|").trim() ||
      `${car.body_type} ${car.year}`,
    year: car.year,
    price: car.price,
    feul: car.feul_type,
    seat: car.information?.features?.seat || "4",
    transmission: car.transmission,
    type: car.body_type,
    kilometer: car.kilometer,
    condition: car.condition,
  };
  return (
    <div className="rounded-xl border-2 border-[#293041] p-2 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="bg-[#1c2331] p-2 rounded-xl text-white shadow-lg mx-auto h-full flex flex-col">
        {/* Car Image */}
        <img
          src={carData.image}
          alt={carData.name}
          className="w-full h-[200px] object-cover rounded-lg mb-6"
        />

        {/* Car Details */}
        <div className="w-full">
          <p className="text-gray-400">
            <span className="mr-1">{carData.name}</span>
            {carData.year}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-normal">{carData.subname}</p>
            <p className="text-yellow-400 text-lg font-medium">
              ${carData.price.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="border-b border-gray-600 my-3"></div>

        {/* Features Section */}
        <div className="flex flex-wrap max-[500px]:gap-6 min-[500px]:gap-5 justify-between text-gray-300 text-sm w-full">
          <div className="flex items-center gap-1">
            <FaGasPump className="text-yellow-400" />
            <span className="text-xs">{carData.feul}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaCogs className="text-yellow-400" />
            <span className="text-xs">{carData.transmission || ""}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaCarSide className="text-yellow-400" />
            <span className="text-xs">{carData.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
