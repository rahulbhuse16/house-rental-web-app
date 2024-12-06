import { setAuthRelatedState } from "@/store/authReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const authState = useSelector(state => state.auth.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState.token && !authState.isVerified) {
      dispatch(setAuthRelatedState({
        ...authState,
        isVerified: true
      }));
    }
  }, [authState.token, authState.isVerified, dispatch]);

  
  console.log("Auth State:", authState);

  return (authState.token || authState.id) ? children : <Navigate to="/login" />;
};
