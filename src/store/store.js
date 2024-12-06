import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import HouseReducer from "./HouseReducer";
import houseDetail from "./HouseDetail"
import notification from "./Notification"
import Payment from './payments'
import user from './profile'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    house: HouseReducer,
    houseDetail:houseDetail,
    notification:notification,
    Payment:Payment,
    user:user
  },
});
