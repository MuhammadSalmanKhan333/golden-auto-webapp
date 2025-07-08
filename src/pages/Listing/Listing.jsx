import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import ListingCarCard from "../../components/ui/ListingCarCard";
import CarFilterSidebar from "../../components/CarFilterSidebar";
import { Link, useLocation } from "react-router-dom";
import { fetchData } from "../../services/apiService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import qs from "qs";

const sortOptions = [
  { id: "default", name: "Default" },
  { id: "newest", name: "Oldest to Newest" },
  { id: "oldest", name: "Newest to Oldest" },
  { id: "price-high", name: "Price Highest to Lowest" },
  { id: "price-low", name: "Price Lowest to Highest" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Listing() {
  const [vehicle, setVehicle] = useState([]);
  const [originalVehicles, setOriginalVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("default");
  const location = useLocation();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);

        const parsed = qs.parse(location.search, { ignoreQueryPrefix: true });
        console.log("parsed=====>", parsed);
        const params = {
          populate: "*",
          ...parsed,
        };

        const response = await fetchData("vehicles", { params });
        setVehicle(response?.data || []);
        setOriginalVehicles(response?.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load vehicles"
        );
        setVehicle([]);
        setOriginalVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchVehicles, 300);
    return () => clearTimeout(timer);
  }, [location.search]);

  const handleSortChange = (sortId) => {
    setSelectedSort(sortId);

    if (sortId === "default") {
      setVehicle([...originalVehicles]);
      return;
    }

    const vehiclesToSort = [...vehicle];

    switch (sortId) {
      case "newest":
        vehiclesToSort.sort(
          (a, b) => new Date(b?.updatedAt || 0) - new Date(a?.updatedAt || 0)
        );
        break;
      case "oldest":
        vehiclesToSort.sort(
          (a, b) => new Date(a?.updatedAt || 0) - new Date(b?.updatedAt || 0)
        );
        break;
      case "price-high":
        vehiclesToSort.sort((a, b) => (b?.price || 0) - (a?.price || 0));
        break;
      case "price-low":
        vehiclesToSort.sort((a, b) => (a?.price || 0) - (b?.price || 0));
        break;
    }

    setVehicle(vehiclesToSort);
  };

  return (
    <div className="bg-[#151F28]">
      {/* Breadcrumb Navigation */}
      <div className="mx-auto max-w-[1200px] px-3 py-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#FED700]"
              >
                <svg
                  className="w-3 h-3 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  Listing
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Mobile Filter Dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-[#151F28] py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-white">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Filter Content - Reuse your CarFilterSidebar component */}
                <div className="mt-4">
                  <CarFilterSidebar mobileView />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="mx-auto max-w-[1200px] px-3">
        <section aria-labelledby="products-heading" className="pb-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Desktop Sidebar - Hidden on mobile */}
            <div className="hidden lg:block">
              <CarFilterSidebar />
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-baseline justify-between pb-4">
                <div className="md:flex items-baseline gap-2">
                  <p className="text-sm md:text-lg font-bold tracking-tight text-gray-400">
                    {vehicle.length} Results
                  </p>
                  {/* <p className="text-xs font-semibold text-[#FED700]">Car</p> */}
                </div>
                <div className="flex gap-2 items-center">
                  <span className="hidden md:block text-[#FED700]">
                    Sort by:
                  </span>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="group min-w-[200px] w-full inline-flex justify-between items-center bg-[#1D2834] border border-gray-300 rounded p-2 text-sm font-medium text-gray-300 hover:text-gray-500 hover:border-gray-400 transition-colors">
                      {/* Display currently selected sort option */}
                      {sortOptions.find((opt) => opt.id === selectedSort)
                        ?.name || "Sort by"}
                      <ChevronDownIcon
                        className="ml-1 h-5 w-5 flex-shrink-0 text-gray-300 group-hover:text-gray-400 transition-colors"
                        aria-hidden="true"
                      />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-50 mt-1 w-40 origin-top-right rounded-md bg-[#333333] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-600">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.id}>
                              {({ active }) => (
                                <button
                                  onClick={() => handleSortChange(option.id)}
                                  className={classNames(
                                    active
                                      ? "bg-[#FED700] text-black"
                                      : "text-white",
                                    "block w-full px-4 py-2 text-sm font-medium text-left transition-colors"
                                  )}
                                >
                                  {option.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  Array(6)
                    .fill()
                    .map((_, i) => (
                      <div key={i} className="bg-[#1D2834] p-4 rounded-lg">
                        <Skeleton
                          height={180}
                          className="mb-3"
                          baseColor="#1D2834"
                          highlightColor="#2A3847"
                        />
                        <Skeleton count={3} />
                      </div>
                    ))
                ) : error ? (
                  <div className="col-span-full text-center py-10 text-red-400">
                    {error}
                  </div>
                ) : vehicle.length === 0 ? (
                  <div className="col-span-full text-center py-10 text-gray-400">
                    No vehicles found matching your criteria
                  </div>
                ) : (
                  vehicle.map((car) => (
                    <Link to={`/details/${car.id}`} key={car.id}>
                      <ListingCarCard car={car} />
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
