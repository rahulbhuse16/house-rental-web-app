import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const signUP = createAsyncThunk(
    'authInfo/signUP',
    async ({ username, password, role }, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/signup', {
                username,
                password,
                role,
            });
            console.log("signUP Response:", response.data); // Debug
            toast.success(response.data.message || "SignUP Success");
            return response.data.userId; // Return only userId
        } catch (err) {
            const errorMessage = err.response?.data?.error || "SignUP Failed";
            console.error("Error in signUP:", err); // Log the error
            toast.error(errorMessage);
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);
export const login = createAsyncThunk(
    'authInfo/login',
    async ({ username, password }, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
                username,
                password,
            });
            console.log("login Response:", response.data); // Debug
            toast.success(response.data.message || "Login Success");
            return response.data; // Return full response
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Login Failed";
            console.error("Error in login:", err); // Log the error
            toast.error(errorMessage);
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);
