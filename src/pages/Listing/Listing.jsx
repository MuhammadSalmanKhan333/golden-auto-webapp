import { Fragment, useRef, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import SearchCarsLocations from "../../components/GooglePlacesApi/SearchCarsLocations";
import CarCard from "../../components/ui/CarCard";
import car1 from "../../assets/images/CarCard.png";
import car2 from "../../assets/images/CarCard.png";
import car3 from "../../assets/images/CarCard.png";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const carData = [
  { id: 1, image: car1, name: "Mazda", subname: "MX2 2019", price: 400 },
  { id: 2, image: car2, name: "Maserati", subname: "Levante 2021", price: 500 },
  {
    id: 3,
    image: car3,
    name: "Bentley",
    subname: "Flying Spur 2019",
    price: 700,
  },
];

const sortOptions = [
  { name: "Popular", href: "#", current: false },
  { name: "Distance", href: "#", current: false },
  { name: "Low to High", href: "#", current: false },
  { name: "High to Low", href: "#", current: false },
];
const catogoryFilters = [
  {
    id: "category",
    name: "Category",
    options: [
      {
        value: "car",
        label: "Car",
        checked: false,
        // subcategories: ["", "All", "Mini/Micro", "Hatchback", "Sedan", "SUV"],
      },
      {
        value: "bus",
        label: "Bus",
        checked: true,
        // subcategories: [
        //   "",
        //   "All",
        //   "Mini Bus",
        //   "Coaster",
        //   "School Van Bus",
        //   "Single Deck",
        // ],
      },
      {
        value: "van",
        label: "Van",
        checked: false,
        // subcategories: ["", "All", "Pickup", "Minivan", "Van"],
      },
      {
        value: "bike&Rikshaw",
        label: "Bike & Rikshaw",
        checked: false,
        // subcategories: ["", "All", "Bike", "Rasksha"],
      },
    ],
  },
];
const priceFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "min", label: "Min", checked: false },
      { value: "max", label: "Max", checked: false },
    ],
  },
];
const otherFilters = [
  {
    id: "slot",
    name: "Slots",
    options: [
      { value: "morning", label: "Morning", checked: false },
      { value: "evening", label: "Evening", checked: false },
      { value: "night", label: "Night", checked: false },
    ],
  },
  {
    id: "gender",
    name: "Gender",
    options: [
      { value: "male", label: "Male", checked: false },
      { value: "female", label: "Female", checked: false },
      { value: "children", label: "Children", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Listing() {
  const [keyword, setKeyword] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedLocation, setSelectedLocation] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });
  console.log(selectedLocation);

  const addSearchTag = (tag) => {
    if (!searchTags.includes(tag)) {
      setSearchTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    const searchInput = e.target.value.trim();
    if (searchInput !== "") {
      addSearchTag(searchInput);
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-[1200px] px-3 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a
                  href="/"
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
                </a>
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
        {/* main-search-container */}
        <div className=" bg-[#374B5C] py-4">
          <div className="mx-auto max-w-[1200px] px-3">
            <div className="flex flex-col items-center space-y-4 md:space-y-0 md:space-x-4 md:flex-row">
              <div className="relative w-full md:w-96 lg:w-[50%]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <div className="text-white bg-[#5C4033] rounded-md p-1">
                    <TbBulb />
                  </div>
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={handleKeywordChange}
                  className="w-full pl-10 bg-white border border-gray-300 py-4 px-2 rounded-md"
                  placeholder="Keyword"
                />
              </div>

              <div className="relative w-full  md:w-96 lg:w-[50%]">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <div className="text-white bg-[#5C4033] rounded-md p-1">
                    <MdOutlineLocationOn />
                  </div>
                </span>
                <SearchCarsLocations
                  setSelectedLocation={setSelectedLocation}
                  placeholder={"Location (e.g. Rawalpindi)"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Mobile filter dialog */}
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
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t px-4 border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    {catogoryFilters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                        defaultOpen
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300  text-[#5C4033] focus:ring-[#5C4033]"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>

                                    {/* Display subcategories as a dropdown */}
                                    {option.subcategories && (
                                      <select
                                        className="ml-3 border-0 w-full"
                                        defaultValue={option.subcategories[0]}
                                      >
                                        {option.subcategories.map(
                                          (subcategory) => (
                                            <option
                                              key={subcategory}
                                              value={subcategory}
                                            >
                                              {subcategory}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    {priceFilter.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                        defaultOpen
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="flex gap-4 items-center">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center border"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="number"
                                      defaultChecked={option.checked}
                                      placeholder={option.label}
                                      className="rounded border p-2 border-gray-300 w-28"
                                    />
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    {otherFilters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                        defaultOpen
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300  text-[#5C4033] focus:ring-[#5C4033]"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-[1200px] px-3">
          <section aria-labelledby="products-heading" className="pb-6 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block bg-white px-4 rounded-md">
                <h3 className="sr-only">Categories</h3>
                {catogoryFilters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                    defaultOpen
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-[#5C4033] focus:ring-[#5C4033]"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>

                                {/* Display subcategories as a dropdown */}
                                {option.subcategories && (
                                  <select
                                    className="ml-3 border-0 w-full text-indigo-600 focus:ring-indigo-500"
                                    defaultValue={option.subcategories[0]}
                                  >
                                    {option.subcategories.map((subcategory) => (
                                      <option
                                        key={subcategory}
                                        value={subcategory}
                                      >
                                        {subcategory}
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                {priceFilter.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                    defaultOpen
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="flex gap-4 items-center">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value}>
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="number"
                                  defaultChecked={option.checked}
                                  placeholder={option.label}
                                  className="rounded border-gray-300 w-28"
                                />
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                {otherFilters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                    defaultOpen
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300  text-[#5C4033] focus:ring-[#5C4033]"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Car grid */}
              <div className="lg:col-span-3">
                {/* Your content */}
                {/* top content */}
                <div className="flex items-baseline justify-between pb-4">
                  <div className="md:flex items-baseline gap-2">
                    <p className="text-sm md:text-lg font-bold tracking-tight text-gray-900">
                      74 Results
                    </p>
                    <p className="text-xs font-semibold text-[#5C4033]">Car</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <span className="hidden md:block">Sort by:</span>
                    <Menu as="div" className="relative inline-block text-left">
                      <div className="bg-white border border-gray-300 rounded p-2">
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-500 hover:text-gray-900">
                          Most Relevant
                          <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-10 flex-shrink-0 text-gray-400 group-hover:text-gray-500 rounded p-1"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {sortOptions.map((option) => (
                              <Menu.Item key={option.name}>
                                {({ active }) => (
                                  <a
                                    href={option.href}
                                    className={classNames(
                                      option.current
                                        ? "font-medium text-gray-900"
                                        : "text-gray-500",
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    {option.name}
                                  </a>
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
                {/* top content end */}
                {/* card content */}
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {/* <RentCarSection /> */}
                  {carData.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
                {/* Pagination will be here.. */}
                {/* card content end */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
