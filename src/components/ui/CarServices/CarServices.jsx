import React, { useEffect, useState } from "react";
import { fetchData } from "../../../services/apiService";
import BestSellingSection from "./BestSellingSection";
import NearbySection from "./NearbySection";

const CarServices = () => {
  const [nearbyCars, setNearbyCars] = useState([]);
  const [bestSellingCars, setBestSellingCars] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(true);
  const [loadingBest, setLoadingBest] = useState(true);
  const [errorNearby, setErrorNearby] = useState(null);
  const [errorBest, setErrorBest] = useState(null);

  useEffect(() => {
    const fetchNearby = async () => {
      setLoadingNearby(true);
      setErrorNearby(null);

      try {
        const data = await fetchData("vehicles?populate=*");
        setNearbyCars(data?.data || []);
        console.log(data?.data);
      } catch (err) {
        console.error("Nearby Vehicles fetch failed:", err);
        setErrorNearby(err.message);
      } finally {
        setLoadingNearby(false);
      }
    };

    const fetchBestSelling = async () => {
      setLoadingBest(true);
      setErrorBest(null);
      try {
        const data = await fetchData("vehicles", {
          params: {
            populate: "*",
            "filters[purchase][$null]": true,
            "pagination[limit]": 4,
          },
        });
        setBestSellingCars(data?.data || []);
        console.log(data?.data);
      } catch (err) {
        console.error("Best Selling Vehicles fetch failed:", err);
        setErrorBest(err.message);
      } finally {
        setLoadingBest(false);
      }
    };

    fetchNearby();
    fetchBestSelling();
  }, []);

  const nearCars = nearbyCars.slice(0, 3);
  const sellingCars = bestSellingCars.slice(0, 3);

  return (
    <section className="max-w-[1200px] mx-auto max-xl:mx-10 mt-20 md:mt-28">
      <NearbySection
        cars={nearCars}
        loading={loadingNearby}
        error={errorNearby}
      />
      <BestSellingSection
        cars={sellingCars}
        loading={loadingBest}
        error={errorBest}
      />
    </section>
  );
};

export default CarServices;
