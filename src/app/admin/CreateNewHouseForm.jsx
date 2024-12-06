import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileUpload from "./FileUpload";
import { houseSchema } from "./schema/house-schema";
import AppFormField from "@/components/AppFormField";
import { Textarea } from "@/components/ui/textarea";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createHouse } from "@/Redux/ThunkFunction/HouseList";
import HouseForm from "./schema/HouseForm";


const formData = [
  {
    name: "houseName",
    type: "text",
    placeholder: "Simple House",
    label: "House Name",
  },
  {
    name: "address",
    type: "text",
    label: "Address",
    placeholder: "Paris, France",
  },
  {
    name: "rentalOfferPrice",
    type: "number",
    label: "Rental Offer Price",
    placeholder: "2,000",
  },
  {
    name: "rentalOrginalPrice",
    type: "number",
    label: "Rental Original Price",
    placeholder: "2,500",
  },
  {
    name: "sellerName",
    type: "text",
    label: "Seller Name",
    placeholder: "Ram Kumar",
  },
  {
    name: "feature1",
    type: "number",
    label: "No. of Bedrooms",
    placeholder: "2",
  },
  {
    name: "feature2",
    type: "number",
    label: "Bathrooms",
    placeholder: "2",
  },
  {
    name: "feature3",
    type: "number",
    label: "House Area",
    placeholder: "5.2 m²",
  },
  {
    name: "houseType",
    type: "select", // Adding a dropdown
    label: "House Type",
    placeholder: "Select house type",
    options: [
      { value: "villa", label: "Villa" },
      { value: "apartment", label: "Apartment" },
      { value: "bungalow", label: "Bungalow" },
    ],
  },
];


const CreateNewHouseForm = () => {
  const [houseImages, setHouseImages] = useState([]);
  const userId=useSelector(state=>state.auth.authState.id);
  const token=useSelector(state=>state.auth.authState.token)

  const form = useForm({
    resolver: zodResolver(houseSchema),
    defaultValues: {
      username: "sample",
      houseName: "Simple House",
      sellerName: "Ram Kumar",
      rentalOrginalPrice: 2500,
      rentalOfferPrice: 2000,
      address: "Paris, France",
      feature1: 2,
      feature2: 2,
      feature3: 5.2,
      
    },
  });

  const navigate = useNavigate();
  const dispatch=useDispatch()

  const[houseType,setHouseType]=useState('');

 /* const { mutate, isPending } = useMutation({
    mutationKey: "createHouse",
    mutationFn: (values) => createNewHouse(values, houseImages),
    onSuccess: () => {
      navigate("/admin/dashboard");
    },
  });*/
  console.log("houseType",houseType)
  const onSubmit = async(values) => {
    
    
    await dispatch(createHouse({
            houseName:values.houseName,
            address:values.address,
            sellerName:values.sellerName,
            rentalOfferPrice:values.rentalOfferPrice,
            rentalOriginalPrice:values.rentalOrginalPrice,
            noOfBedrooms:values.feature1,
            bathrooms:values.feature1,
            houseArea:values.feature3,
            description:values.houseDesc,
            userId:userId,
            images:houseImages,
            token: token,
            



  }))
  navigate('/all-houses')
}
  //console.log("houseImages",houseImages)

  return (
    <HouseForm/>
  );
};

export default CreateNewHouseForm;
