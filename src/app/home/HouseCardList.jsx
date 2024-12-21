import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHouseList } from "@/Redux/ThunkFunction/HouseList";
import HouseCard from "@/components/HouseCard";
import HouseCardSkeleton from "./HouseCardSkeleton";

const HouseCardList = ({ limit = 0 }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [priceRange, setPriceRange] = useState([0, 1000000]); // State for price range (min and max)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(null); // Track selected price index

  const houseListState = useSelector((state) => state.house.houseListRelatedState);
  const houseList = houseListState.houseList;
  const isPending = houseListState.isLoading;
  const authState = useSelector((state) => state.auth.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHouseList({ token: authState.token }));
  }, [dispatch, authState.token]);

  const renderHouseCardSkeleton = Array.from({ length: 3 }).map((_, index) => (
    <HouseCardSkeleton key={index} />
  ));

  let displayedData = houseList.houses;

  if (limit > 0) {
    displayedData = houseList.houses?.slice(0, limit);
  }

  // Filter houses based on the search query and price range
  const filteredHouses = displayedData?.filter(
    (house) =>
      (house.houseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        house.address.toLowerCase().includes(searchQuery.toLowerCase())) &&
      house.rentalOfferPrice >= priceRange[0] &&
      house.rentalOfferPrice <= priceRange[1]
  );

  const priceOptions = [
    [0, 50000],
    [50000, 100000],
    [100000, 300000],
    [300000, 500000],
    [500000, 1000000],
  ];

  const handlePriceSelect = (index) => {
    setSelectedPriceIndex(index);
    setPriceRange(priceOptions[index]);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div>
      {/* Filters Section */}
      <div className="mb-6 flex items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search houses by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Price Range Dropdown */}
        <div className="relative w-64">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {selectedPriceIndex !== null
              ? `${priceOptions[selectedPriceIndex][0].toLocaleString()} - ${priceOptions[selectedPriceIndex][1].toLocaleString()}`
              : "Select Price Range"}
          </button>
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {priceOptions.map((range, index) => (
                <li
                  key={index}
                  onClick={() => handlePriceSelect(index)}
                  className="p-3 cursor-pointer hover:bg-violet-500 hover:text-white"
                >
                  {`${range[0].toLocaleString()} - ${range[1].toLocaleString()}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* House Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isPending
          ? renderHouseCardSkeleton
          : filteredHouses?.map((house) => (
              <div key={house.id}>
                <HouseCard
                  id={house.id}
                  houseAddress={house.address}
                  houseCoverImage={
                    house?.houseImages?.[0] ||
                    "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww"
                  }
                  houseName={house.houseName}
                  houseBadge={house.houseStatus + " out"}
                  housePrice={house.rentalOfferPrice}
                  isAvailable={house.houseStatus === "unsold"}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default HouseCardList;
