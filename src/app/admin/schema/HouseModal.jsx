import React, { useState, useEffect } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useDispatch,useSelector } from 'react-redux';
import { createHouse } from '@/Redux/ThunkFunction/HouseList';
const HouseFormModal = ({ open, onClose }) => {
    const dispatch=useDispatch()

  const userId = useSelector(state => state.auth.authState.id);
  const token = useSelector(state => state.auth.authState.token);
  const [formData, setFormData] = useState({
    houseName: '',
    address: '',
    rentalOfferPrice: '',
    rentalOriginalPrice: '',
    sellerName: '',
    houseDropDown: '',
    houseArea: '',
    description: '',
    dropdownOption: '',
    images: [],
  });

  const [markerPosition, setMarkerPosition] = useState(null); // Initial marker position
  const [userLocation, setUserLocation] = useState(null); // User's live location
  useEffect(() => {
    // Get the user's live location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMarkerPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          // Fallback to default center if location is not available
          setUserLocation({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
          setMarkerPosition([37.7749, -122.4194]);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      // Fallback to default center if geolocation is not supported
      setUserLocation({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
      setMarkerPosition([37.7749, -122.4194]);
    }
  }, []);

  // Handle map click to update marker and fetch address
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);

        // Fetch address using Nominatim API
        axios
          .get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
              lat,
              lon: lng,
              format: 'json',
            },
          })
          .then((response) => {
            const address = response.data.display_name;
            setFormData((prev) => ({ ...prev, address }));
          })
          .catch((error) => console.error('Geocoding error:', error));
      },
    });

    return null;
  };

  // Image upload handler
  const handleDrop = (acceptedFiles) => {
    const imageData = acceptedFiles.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...imageData] });

    // Optionally, send images to backend via API here
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('image', file);
      axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
          console.log("Image uploaded successfully:", response.data);
        })
        .catch(error => {
          console.error("Error uploading image:", error);
        });
    });
  };

  // Ensure useDropzone is always called outside of any conditionals
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
  });

  if (!userLocation) {
    return <div>Loading...</div>; // Show loading state until the location is fetched
  }
  

  const handleSubmit = (e) => {
      e.preventDefault();
    
      // Validate the form data
      if (!formData.houseName || !formData.address || !formData.sellerName ||
          !formData.rentalOfferPrice || !formData.rentalOriginalPrice ||
          !formData.houseArea || !formData.description || !formData.images) {
        return;
      }
    
      // Dispatch createHouse and handle the response
      dispatch(createHouse({
        houseName: formData.houseName,
        address: formData.address,
        sellerName: formData.sellerName,
        rentalOfferPrice: formData.rentalOfferPrice,
        rentalOriginalPrice: formData.rentalOriginalPrice,
        houseArea: formData.houseArea,
        FlatType: formData.dropdownOption,
        description: formData.description,
        userId: userId,
        images: formData.images,
        token: token,
        houseType: formData.houseDropDown, // Use the dropdown value here
      }))
      .unwrap()
      .then((response) => {
          navigate('/admin/dashboard'),
          onClose()
         
      })
      .catch((error) => {
        console.error("Error creating house:", error);
      });
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">House Rental Form</Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: 3, maxHeight: '80vh', overflowY: 'auto' }}>
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="House Name"
            name="houseName"
            value={formData.houseName}
            onChange={(e) => setFormData({ ...formData, houseName: e.target.value })}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={formData.address}
            variant="outlined"

            disabled
            sx={{ marginBottom: 2 }}
          />
          <MapContainer center={userLocation} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markerPosition && <Marker position={markerPosition} />}
            <MapClickHandler />
          </MapContainer>
          <TextField
            fullWidth
            margin="normal"
            label="Rental Offer Price"
            name="rentalOfferPrice"
            value={formData.rentalOfferPrice}
            onChange={(e) => setFormData({ ...formData, rentalOfferPrice: e.target.value })}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Rental Original Price"
            name="rentalOriginalPrice"
            value={formData.rentalOriginalPrice}
            onChange={(e) => setFormData({ ...formData, rentalOriginalPrice: e.target.value })}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Seller Name"
            name="sellerName"
            value={formData.sellerName}
            onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="House Area"
            name="houseArea"
            value={formData.houseArea}
            onChange={(e) => setFormData({ ...formData, houseArea: e.target.value })}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="House Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            variant="outlined"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />

          {/* Dropdown for House Type */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="houseDropDown-label">House Type</InputLabel>
            <Select
              labelId="houseDropDown-label"
              value={formData.houseDropDown}
              onChange={(e) => setFormData({ ...formData, houseDropDown: e.target.value })}
              label="House Type"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="apartment">Apartment</MenuItem>
              <MenuItem value="villa">Villa</MenuItem>
              <MenuItem value="house">House</MenuItem>
            </Select>
          </FormControl>

          {/* Dropdown for Additional Option */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="dropdownOption-label">Additional Options</InputLabel>
            <Select
              labelId="dropdownOption-label"
              value={formData.dropdownOption}
              onChange={(e) => setFormData({ ...formData, dropdownOption: e.target.value })}
              label="Additional Options"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="1BHK">Furnished</MenuItem>
              <MenuItem value="2BHK">Unfurnished</MenuItem>
              <MenuItem value="3BHK">Partially Furnished</MenuItem>
            </Select>
          </FormControl>

          {/* Image Capture */}
          <Box {...getRootProps()} sx={{ border: '1px dashed', padding: 2, marginBottom: 2, cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <Typography>Click here to upload images or drag and drop</Typography>
          </Box>
          <Box>
            {formData.images.map((image, index) => (
              <img key={index} src={image} alt={`preview ${index}`} style={{ width: '100px', marginRight: '8px', marginBottom: '8px' }} />
            ))}
          </Box>

          {/* Map Display */}
          
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="violet">Cancel</Button>
        <Button onClick={handleSubmit} color="violet">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HouseFormModal;
