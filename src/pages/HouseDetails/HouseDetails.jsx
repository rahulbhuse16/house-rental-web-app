import { useParams } from "react-router-dom";
import { useState ,useEffect} from "react";
import DynamicHouseDetailsHeader from "./DynamicHouseDetailsHeader";
import ImageGallerySkeleton from "./ImageGallerySkeleton";
import ImageGallery from "./ImageGallery";
import { useSelector,useDispatch } from "react-redux";
import { fetchHouseDetails } from "@/Redux/ThunkFunction/HouseList";

import HouseDetialsData from "./HouseDetialsData";
const HouseDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const token=useSelector(state=>state.auth.authState.token);


  const houseDetailState=useSelector(state=>state.houseDetail.houseDetailState)
  console.log(houseDetailState)

  useEffect(()=>{
    dispatch(fetchHouseDetails({
      id:params.id,
      token:token
    }))
  },[])

  const [isLiked, setIsLiked] = useState(false);
  const handleOnclickFavoriteButton = () => setIsLiked(!isLiked);

  const mainImageUrl =
    houseDetailState.images?.[0] ||
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D";

  const otherImages = [
    houseDetailState.images?.[1] ||
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      houseDetailState.images?.[2] ||
      "https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      houseDetailState.images?.[3] ||
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      houseDetailState.images?.[4] ||
      "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <main className="flex flex-col mt-10 gap-10">
      <DynamicHouseDetailsHeader
        title="House Detials"
        showShareButton
        handleOnclickFavoriteButton={handleOnclickFavoriteButton}
        isLiked={isLiked}
      />
      {houseDetailState.isLoading ? (
        <ImageGallerySkeleton />
      ) : (
        <>
          <ImageGallery mainImageUrl={mainImageUrl} otherImages={otherImages} />
          <HouseDetialsData data={houseDetailState} />
        </>
      )}
    </main>
  );
};

export default HouseDetails;
