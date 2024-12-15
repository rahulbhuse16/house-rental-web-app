import HouseCard from "@/components/HouseCard";

import HouseCardSkeleton from "./HouseCardSkeleton";
import { useEffect } from "react";
import { fetchHouseList } from "@/Redux/ThunkFunction/HouseList"
import { useSelector,useDispatch } from "react-redux";
import Chat from "@/pages/Chat/Chat";

const HouseCardList = ({ limit = 0 }) => {
 /* const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchHouseList,
  });*/
  const renderHouseCardSkeleton = Array.from({ length: 3 }).map((_, index) => (
    <HouseCardSkeleton key={index} />
  ));


  const houseListState=useSelector(state=>state.house.houseListRelatedState);
  const houseList=houseListState.houseList;
  const isPending=houseListState.isLoading;
  const authState=useSelector(state=>state.auth.authState)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchHouseList({token:authState.token}))

  },[])

  let displayedData = houseList.houses;

  if (limit > 0) {
    displayedData = houseList.houses?.slice(0, limit);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {isPending
        ? renderHouseCardSkeleton
        : houseList?.houses?.map((house) => (
           <div style={{
            flex:1
           }} aria-disabled={true}>
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
              key={house.id}
              isAvailable={house.houseStatus=='unsold'}
            />
            </div>
          ))}
          
    </div>
  );
};

export default HouseCardList;
