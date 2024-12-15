import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileById } from '@/Redux/ThunkFunction/Profile';
import { useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { fetchPayments } from '@/Redux/ThunkFunction/Payment';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract user ID from URL params
  const profileState = useSelector((state) => state.user);
  const authState = useSelector(state => state.auth.authState)
  const { payments = [], isLoading } = useSelector((state) => state.Payment);

  useEffect(() => {
    dispatch(fetchUserProfileById(id)); // Pass the `id` to the dispatch function
  }, [dispatch, id]); // Added dependency on `id` to re-fetch if the `id` changes

  useEffect(() => {
    dispatch(fetchPayments({ userId: id }));
  }, []);

  console.log("payments", payments)

  let amountCollected = 0;

  if (Array.isArray(payments)) {
    payments.forEach((i) => {
      amountCollected += i.totalAmount || 0; // Ensure totalAmount is valid
    });
  }
  console.log(profileState);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div
          style={{
            backgroundColor: "#F3E6F4"
          }}
          className="bg-200 p-4 rounded-full">
          <AccountCircleIcon style={{ fontSize: 60, color: '#51158c' }} /> {/* Profile Icon */}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{profileState.user.username}</h1>
          <p className="text-sm text-gray-600">Role: {profileState.user.role}</p>
          <p className="text-sm text-gray-500">Registered: {new Date(profileState.user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Section */}
      
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <div className="p-4 bg-blue-100 text-center rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-700">{ authState.role==='user'?profileState.totalHousesBought:payments?.length}</h2>
          <p className="text-sm text-gray-600">{
            authState.role==='user' ? 'House Purchased Count' :'House Sold Count'
            }</p>
        </div>
        <div className="p-4 bg-green-100 text-center rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700">{authState.role === 'user' ? profileState.totalPayments?.toFixed(2) : amountCollected}</h2>
          <p className="text-sm text-gray-600">
            {authState.role === 'user' ?
              "Total Payments" : "Payments Collected"}</p>
        </div>
      </div>

      {/* Houses List */}
      {authState.role==='user'?
      (<div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Houses</h2>
        <ul className="mt-4 space-y-4">
          {profileState.Houses.length > 0 ? (
            profileState.Houses.map((house) => (
              <li key={house.id} className="p-6 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-bold text-gray-800">{house.houseName}</h3>
                <p className="text-sm text-gray-600">Type: {house.houseType}</p>
                <p>
                  Status:{' '}
                  <span
                    className={`px-2 py-1 rounded ${house.houseStatus === 'Unsold' ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    {house.houseStatus}
                  </span>
                </p>
                <p>Price: ${house.rentalOfferPrice} (Offer) / ${house.rentalOriginalPrice} (Original)</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No houses available.</p>
          )}
        </ul>
      </div>):null}

      {/* Payment History */}
      {authState.role==='user'?
      (<div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Payment History</h2>
        <ul className="mt-4 space-y-4">
          {profileState.Payments.length > 0 ? (
            profileState.Payments.map((payment) => (
              <li
                style={{
                  backgroundColor: "#EBEBEB"
                }}
                key={payment.id} className="p-6 bg-50 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
                <p>Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
                <p>Amount: ${payment.totalAmount}</p>
                <p>Card: **** **** **** {payment.cardNumber.slice(-4)}</p> {/* Card last 4 digits */}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No payments available.</p>
          )}
        </ul>
      </div>):null}
    </div>
  );
};

export default UserProfile;

