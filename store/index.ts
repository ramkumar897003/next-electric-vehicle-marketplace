import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "@/features/vehicles/slices/vehicleSlice";
import vehicleDetailReducer from "@/features/vehicles/slices/vehicleDetailSlice";

export const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    vehicleDetail: vehicleDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
