import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleType } from "../VehicleTypes";
import { getVehicleById } from "../services/VehicleService";

interface VehicleDetailState {
  vehicle: VehicleType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: VehicleDetailState = {
  vehicle: null,
  isLoading: false,
  error: null,
};

export const fetchVehicleById = createAsyncThunk(
  "vehicleDetail/fetchVehicleById",
  async (id: string) => {
    return await getVehicleById(Number(id));
  }
);

const vehicleDetailSlice = createSlice({
  name: "vehicleDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicle = action.payload;
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch vehicle";
      });
  },
});

export default vehicleDetailSlice.reducer;
