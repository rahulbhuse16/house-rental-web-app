import HouseCard from "@/components/HouseCard";
import HouseCardSkeleton from "./HouseCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchHouseList } from "@/Redux/ThunkFunction/HouseList";
import ChartsPage from "@/pages/Charts/Statistics";

const AllHouseList = () => {
  const houseListState = useSelector((state) => state.house.houseListRelatedState);
  const houseList = houseListState.houseList;
  const isPending = houseListState.isLoading;
  const authState = useSelector((state) => state.auth.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHouseList({ token: authState.token }));
  }, [dispatch, authState.token]);

  const renderHouseCardSkeleton = Array.from({ length: 4 }).map((_, index) => (
    <HouseCardSkeleton key={index} />
  ));
  return (
    <div className="my-5">
      {/* Charts Page can be placed here */}
      <ChartsPage />

      {/* House Cards Grid */}
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isPending
          ? renderHouseCardSkeleton
          : houseList?.houses?.map((house) => (
              <div aria-disabled={true}>
              <HouseCard
                key={house.id}
                id={house.id}
                houseAddress={house.address}
                houseCoverImage={
                  
                  "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww"
                }
                houseName={house.houseName}
                houseBadge={house.houseType}
                housePrice={house.rentalOfferPrice}
              />
              </div>
            ))}
      </div>
    </div>
  );
};

export default AllHouseList;
