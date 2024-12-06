import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import "./index.css";
import Login from "./app/auth/Login.jsx";
import AppLayout from "./AppLayout.jsx";
import MainPage from "./app/home/MainPage.jsx";
import SignUp from "./app/auth/SignUp.jsx";
import AllHouseList from "./app/home/AllHouseList";
import AdminDashboard from "./app/admin/AdminDashboard";
import HouseCardList from "./app/home/HouseCardList";
import CreateNewHouseForm from "./app/admin/CreateNewHouseForm";
import HouseDetails from "./pages/HouseDetails/HouseDetails";
import { ProtectedRoute } from "./app/admin/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { GlobalWrapper } from "./pages/GlobalWrapper";
import Payment from "./pages/Payment/Payment";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";
import NotiFication from "./pages/NotiFications/Notification";
import PaymentHistory from "./pages/PaymentHistory/PaymentHistory";
import ChartsPage from "./pages/Charts/Statistics";
import ProfilePage from "./pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalWrapper />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <MainPage />,
          },
          {
            path: "/all-houses",
            element: <AllHouseList />,
          },
          {
            path: "house/:id",
            element: <HouseDetails />,
          },
        ],
      },
      {
        path: "house/:id/payment",
        element: <Payment />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/admin/dashboard",
            element: <HouseCardList />,
          },
          {
            path: "/admin/dashboard/new-house",
            element: <CreateNewHouseForm />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "notifications",
        element: <NotiFication/>,
      },
      {
        // Route for PaymentHistory with dynamic userId
        path: "user/:userId/payment-history",
        element: <PaymentHistory />,
      },
      {
        path:"analytics",
        element:<ChartsPage/>
      },
      {
        path:"profile/:id",
        element:<ProfilePage/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
       <ToastContainer/>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
