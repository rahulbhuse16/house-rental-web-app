import Map from "@/components/Map";
import NavigationButton from "@/components/NavigationButton";

import { TbBed } from "react-icons/tb";
import { PiBathtubLight } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { PiShootingStarThin } from "react-icons/pi";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing } from "lucide-react";
import Separator from "@/components/Separator";

import {
  calculateDiscountPercentage,
  cn,
  formatIndianRupee,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouseDetails } from "@/Redux/ThunkFunction/HouseList";
import Chat from "../Chat/Chat";

const HouseDetialsData = ({ data }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [activeSection, setActiveSection] = useState("location");
  const authState=useSelector(state=>state.auth.authState);

  const houseDetailState=useSelector(state=>state.houseDetail.houseDetailState)

  const params = useParams();
  const dispatch = useDispatch();
  const getGeoLocation = async (address) => {
    if (!address) return;
  
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
      );
  
      if (!response.ok) {
        console.error("Failed to fetch location data. Status:", response.status);
        return;
      }
  
      const data = await response.json();
      console.log("Geocoding Response:", data);
  
      if (data.length === 0) {
        console.error("No results found for the address:", address);
        return;
      }
  
      // Extract latitude and longitude from the first result
      const { lat, lon } = data[0];
      setLocation({
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      });
  
      console.log("Location set:", { lat, lon });
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
    }
  };
  
  
  const role=localStorage.getItem('role')

  useEffect(()=>{
    dispatch(fetchHouseDetails({
      id:params.id,
      token:authState.token
    }))
  },[])
  useEffect(() => {
    if (houseDetailState.address) {
      getGeoLocation(houseDetailState.address);
    }
  }, [houseDetailState.address]);
  if (!data) return;
  return (
    <div  className="mt-20 flex gap-5 flex-col md:flex-row">
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-2xl font-space">{data?.houseName}</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
          <div className="flex gap-3 flex-wrap">
            <p className="text-muted-foreground flex items-center gap-2">
              <TbBed className="w-7 h-7" />
              <span>{data?.noOfBedrooms} Bedroom</span>
            </p>
            <p className="text-muted-foreground flex items-center gap-2">
              <PiBathtubLight className="w-7 h-7" />
              <span>{data?.bathRooms} Bathroom</span>
            </p>
            <p className="text-muted-foreground flex items-center gap-2">
              <HiOutlineSquares2X2 className="w-7 h-7" />
              <span>{data?.houseArea} m&sup2;</span>
            </p>
          </div>

          <p className="flex items-center text-primary">
            <FaLocationDot className="w-5 h-5" />
            <span className="text-[17px]">{data?.address}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-5 mt-5">
          <Button
            variant="outline"
            className={cn("border-2", {
              "border-primary": activeSection === "overview",
            })}
            onClick={() => setActiveSection("overview")}
          >
            Property Overview
          </Button>

          <Button
            variant="outline"
            className={cn("border-2", {
              "border-primary": activeSection === "location",
            })}
            onClick={() => setActiveSection("location")}
          >
            Property Location 
          </Button>
        </div>

        <div className="mt-3">
          {
            {
              overview: (
                <div className="mt-5">
                  <h3 className="text-lg font-semibold">Property Overview</h3>
                  <p className="text-muted-foreground">{data?.houseDesc}</p>
                </div>
              ),
              location: (
                <Map
                  markers={[
                    {
                      geocode: [location.lat, location.lng],
                      popUp: data?.address,
                    },
                  ]}
                />
              ),
            }[activeSection]
          }
        </div>
      </div>
      {authState.role!='admin' &&
      (<Card className="lg:w-[400px]">
        <CardHeader>
          <CardDescription className="font-semibold text-base">
            Buy with the price
          </CardDescription>
          <CardTitle className="font-space text-3xl">
            {formatIndianRupee(data?.rentalOfferPrice)}
          </CardTitle>

          <Separator />

          <CardDescription className="font-semibold  text-base">
            Market price based on location
          </CardDescription>
          <CardTitle className="font-space text-3xl flex-wrap sm:flex-nowrap flex items-center">
            {formatIndianRupee(houseDetailState.rentalOriginalPrice)}
            <span className="flex text-lg sm:items-center sm:ml-3 mt-1 sm:mt-0">
              <PiShootingStarThin className="w-6 h-6 mr-2" />
              {calculateDiscountPercentage(
                data?.rentalOrginalPrice,
                data?.rentalOfferPrice
              )}
              % cheaper
            </span>
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {data?.sellerName} 
               
              </p>
              <p className="text-sm text-muted-foreground">Seller</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          <NavigationButton
            callback={() => {}}
            className="w-full"
            to={`/house/${params.id}/payment`}
          >
            Buy the house 
          </NavigationButton>
        </CardFooter>
      </Card>)}
     
    </div>
  );
};

export default HouseDetialsData;
