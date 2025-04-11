import React from "react";

const LatestCar = () => {
  // Sample car data
  const cars = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brand: "BMW",
      model: "X7 M50i",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brand: "Audi",
      model: "RS7 Sportback",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brand: "Honda",
      model: "Civic Type R",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brand: "Mercedes",
      model: "AMG GT",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brand: "Tesla",
      model: "Model S Plaid",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-[#FED700] mb-8">Latest Cars</h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left featured card - now spans 3 columns instead of 2 */}
        {/* Left featured card - now spans 3 columns instead of 2 */}
        <div className="lg:col-span-3 group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
          <div className="w-full h-full overflow-hidden">
            <img
              src={cars[0].image}
              alt={`${cars[0].brand} ${cars[0].model}`}
              className="w-full h-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold">{cars[0].brand}</h3>
              <p className="text-lg">{cars[0].model}</p>
            </div>
          </div>
        </div>

        {/* Right side - spans 2 columns */}
        <div className="lg:col-span-2 flex flex-col gap-4 h-full">
          {/* Top two cards */}
          <div className="grid grid-cols-2 gap-4 h-[50%]">
            {cars.slice(1, 3).map((car) => (
              <div
                key={car.id}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
              >
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-semibold">{car.brand}</h3>
                    <p className="text-sm">{car.model}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom full-width card */}
          <div className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-[50%]">
            <img
              src={cars[3].image}
              alt={`${cars[3].brand} ${cars[3].model}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <div className="text-white">
                <h3 className="text-xl font-semibold">{cars[3].brand}</h3>
                <p className="text-md">{cars[3].model}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestCar;
