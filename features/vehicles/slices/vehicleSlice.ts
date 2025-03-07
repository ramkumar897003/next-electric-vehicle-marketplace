import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleType } from "@/features/vehicles/VehicleTypes";
import {
  VehicleFilters,
  getVehicles,
} from "@/features/vehicles/services/VehicleService";

interface VehicleState {
  vehicles: VehicleType[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  filters: VehicleFilters | null;
  sortBy: "price_asc" | "price_desc" | "year_desc" | "range_desc" | null;
}

const initialState: VehicleState = {
  vehicles: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  filters: null,
  sortBy: null,
};

// Update thunks
export const fetchVehicles = createAsyncThunk(
  "vehicles/fetchVehicles",
  async ({
    page,
    sort,
  }: {
    page: number;
    sort: typeof initialState.sortBy;
  }) => {
    return await getVehicles({ sort }, page);
  }
);

export const fetchFilteredVehicles = createAsyncThunk(
  "vehicles/fetchFilteredVehicles",
  async ({ filters, page }: { filters: VehicleFilters; page: number }) => {
    // Ensure we're not modifying the original filters object
    const filtersWithSort = { ...filters };
    return await getVehicles(filtersWithSort, page);
  }
);

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1; // Reset to first page when filters change
    },
    resetFilters: (state) => {
      state.filters = null;
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchVehicles
      .addCase(fetchVehicles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicles = action.payload.data;
        state.totalPages = action.payload.last_page;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch vehicles";
      })
      // Handle fetchFilteredVehicles
      .addCase(fetchFilteredVehicles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilteredVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicles = action.payload.data;
        state.totalPages = action.payload.last_page;
      })
      .addCase(fetchFilteredVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch vehicles";
      });
  },
});

export const { setCurrentPage, setFilters, resetFilters, setSortBy } =
  vehicleSlice.actions;
export default vehicleSlice.reducer;
