import React, { useState } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Box,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { createHouse } from '@/Redux/ThunkFunction/HouseList';

const HouseFormModal = ({ open=true, handleClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        houseName: '',
        address: '',
        rentalOfferPrice: '',
        rentalOriginalPrice: '',
        sellerName: '',
        bedrooms: '',
        bathrooms: '',
        houseArea: '',
        description: '',
        dropdownOption: '',
        images: [],
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onDrop = (acceptedFiles) => {
        setFormData({
            ...formData,
            images: [...formData.images, ...acceptedFiles],
        });
    };

    const userId = useSelector((state) => state.auth.authState.id);
    const token = useSelector((state) => state.auth.authState.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(
            createHouse({
                houseName: formData.houseName,
                address: formData.address,
                sellerName: formData.sellerName,
                rentalOfferPrice: formData.rentalOfferPrice,
                rentalOriginalPrice: formData.rentalOriginalPrice,
                noOfBedrooms: formData.bedrooms,
                bathrooms: formData.bathrooms,
                houseArea: formData.houseArea,
                description: formData.description,
                userId,
                images: formData.images,
                token,
                houseType: formData.dropdownOption,
            })
        );
        handleClose();
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>House Rental Form</DialogTitle>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
                <TextField
                    label="House Name"
                    name="houseName"
                    value={formData.houseName}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Rental Offer Price"
                    name="rentalOfferPrice"
                    type="number"
                    value={formData.rentalOfferPrice}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Rental Original Price"
                    name="rentalOriginalPrice"
                    type="number"
                    value={formData.rentalOriginalPrice}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Seller Name"
                    name="sellerName"
                    value={formData.sellerName}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="No. of Bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="House Area (in sq. meters)"
                    name="houseArea"
                    type="number"
                    value={formData.houseArea}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="House Description"
                    name="description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel>Select Type</InputLabel>
                    <Select
                        name="dropdownOption"
                        value={formData.dropdownOption}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="villa">Villa</MenuItem>
                        <MenuItem value="apartment">Apartment</MenuItem>
                        <MenuItem value="bungalow">Bungalow</MenuItem>
                    </Select>
                </FormControl>
                <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', padding: 2, textAlign: 'center', cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    <Typography>Drag & drop images here, or click to select files</Typography>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default HouseFormModal;
