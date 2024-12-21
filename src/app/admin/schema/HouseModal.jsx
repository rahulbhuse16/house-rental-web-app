import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Upload, Typography, message } from 'antd';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { createHouse } from '@/Redux/ThunkFunction/HouseList';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const HouseFormModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.authState.id);
  const token = useSelector((state) => state.auth.authState.token);

  const [formData, setFormData] = useState({
    houseName: '',
    address: '',
    rentalOriginalPrice: '',
    sellerName: '',
    houseDropDown: '',
    houseArea: '',
    description: '',
    dropdownOption: '',
    purchaseCategory: '',
    images: [],
    mobileNumber: '',
  });

  const [markerPosition, setMarkerPosition] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch user's current location using geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMarkerPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error fetching location: ', error);
          setUserLocation({ lat: 19.8849, lng: 74.4728 }); // Default coordinates
          setMarkerPosition([19.8849, 74.4728]);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
      setMarkerPosition([37.7749, -122.4194]);
    }
  }, []);

  // Handle map click event and fetch address

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
 
  // Handle form submission
  const handleSubmit = () => {
    if (
      !formData.houseName ||
      !formData.address ||
      !formData.sellerName ||
      !formData.purchaseCategory ||
      !formData.rentalOriginalPrice ||
      !formData.houseArea ||
      !formData.description ||
      !formData.images.length ||
      !formData.mobileNumber
    ) {
      message.error('Please fill all required fields.');
     // return;
    }

    dispatch(
      createHouse({
        houseName: formData.houseName,
        address: formData.address,
        sellerName: formData.sellerName,
        purchaseCategory:formData.purchaseCategory,
        rentalOriginalPrice: formData.rentalOriginalPrice,
        houseArea: formData.houseArea,
        FlatType: formData.dropdownOption,
        description: formData.description,
        userId: userId,
        images: formData.images,
        token: token,
        houseType: formData.houseDropDown,
        purchaseCategory: formData.purchaseCategory,
        mobileNumber: formData.mobileNumber,
      })
    )
      .unwrap()
      .then(() => {
        message.success('House created successfully!');
        onClose();
      })
      .catch((error) => {
        console.error('Error creating house:', error);
        message.error('Failed to create house.');
      });
  };

  // Handle image upload (get file URL locally)
  const handleFileUpload = ({ file, onSuccess }) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, reader.result], // Adding image as data URL
      }));
      onSuccess(null, file);
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      message.error('Failed to read image.');
    };

    reader.readAsDataURL(file); // Convert image file to data URL
  };

  if (!userLocation) {
    return <div>Loading...</div>;
  }

  return (
    <Modal open={open} onCancel={onClose} onOk={handleSubmit} title="House Rental Form" width={800}>
      <Form layout="vertical">
        <Form.Item label="House Name" required>
          <Input
            value={formData.houseName}
            onChange={(e) => setFormData({ ...formData, houseName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Address" required>
          <Input value={formData.address} disabled />
        </Form.Item>

        <div style={{ height: '400px', marginBottom: '16px' }}>
          <MapContainer center={userLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {markerPosition && <Marker position={markerPosition} />}
            <MapClickHandler />
          </MapContainer>
        </div>

        <Form.Item label="Purchase Category" required>
          <Select
            value={formData.purchaseCategory}
            onChange={(value) => setFormData({ ...formData, purchaseCategory: value })}
          >
            <Option value="for Sale">For Sale</Option>
            <Option value="for Rent">For Rent</Option>
          </Select>
        </Form.Item>

        <Form.Item label="House Price" required>
          <Input
            value={formData.rentalOriginalPrice}
            onChange={(e) => setFormData({ ...formData, rentalOriginalPrice: e.target.value })}
          />
        </Form.Item>

        

        <Form.Item label="Seller Name" required>
          <Input
            value={formData.sellerName}
            onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Mobile Number" required>
          <Input
            value={formData.mobileNumber}
            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="House Area" required>
          <Input
            value={formData.houseArea}
            onChange={(e) => setFormData({ ...formData, houseArea: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="House Description" required>
          <TextArea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="House Type" required>
          <Select
            value={formData.houseDropDown}
            onChange={(value) => setFormData({ ...formData, houseDropDown: value })}
          >
            <Option value="apartment">Apartment</Option>
            <Option value="villa">Villa</Option>
            <Option value="house">House</Option>
          </Select>
        </Form.Item>

        

        <Form.Item label="Additional Options" required>
          <Select
            value={formData.dropdownOption}
            onChange={(value) => setFormData({ ...formData, dropdownOption: value })}
          >
            <Option value="1BHK">1BHK</Option>
            <Option value="2BHK">2BHK</Option>
            <Option value="3BHK">3BHK</Option>
            <Option value="1RK">1RK</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Images" required>
          <Upload
            customRequest={handleFileUpload}
            listType="picture-card"
            multiple
            showUploadList
          >
            <Button>Upload</Button>
          </Upload>
          <div style={{ marginTop: 16 }}>
            {formData.images.map((img, index) => (
              <img key={index} src={img} alt="house" style={{ width: 100, marginRight: 10 }} />
            ))}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HouseFormModal;
