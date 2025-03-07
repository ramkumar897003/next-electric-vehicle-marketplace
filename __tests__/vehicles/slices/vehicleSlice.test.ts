import vehicleReducer, {
  setCurrentPage,
  setFilters,
  resetFilters,
  setSortBy,
  fetchVehicles,
  fetchFilteredVehicles,
} from "@/features/vehicles/slices/vehicleSlice";
import { VehicleResponse } from "@/features/vehicles/VehicleTypes";
import { getVehicles } from "@/features/vehicles/services/VehicleService";

// Add mock for getVehicles
jest.mock("@/features/vehicles/services/VehicleService");

describe("vehicleSlice", () => {
  const initialState = {
    vehicles: [],
    isLoading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    filters: null,
    sortBy: null,
  };

  const mockResponse: VehicleResponse = {
    data: [
      {
        id: 1,
        brand: "Tesla",
        model: "Model S",
        year: 2023,
        price: 89990,
        range_km: 600,
        color: "Red",
        condition: "New",
        battery_capacity_kWh: 100,
        charging_speed_kW: 250,
        seats: 5,
        drivetrain: "AWD",
        location: "New York",
        autopilot: true,
        kilometer_count: 0,
        accidents: false,
        images: ["image1.jpg"],
      },
    ],
    total: 1,
    per_page: 10,
    current_page: 1,
    last_page: 2,
  };

  beforeEach(() => {
    (getVehicles as jest.Mock).mockClear();
  });

  it("should handle initial state", () => {
    expect(vehicleReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setCurrentPage", () => {
    const actual = vehicleReducer(initialState, setCurrentPage(2));
    expect(actual.currentPage).toEqual(2);
  });

  it("should handle setFilters", () => {
    const filters = { search: "tesla" };
    const actual = vehicleReducer(initialState, setFilters(filters));
    expect(actual.filters).toEqual(filters);
    expect(actual.currentPage).toEqual(1);
  });

  it("should handle resetFilters", () => {
    const stateWithFilters = {
      ...initialState,
      filters: { search: "tesla" },
      currentPage: 2,
    };
    const actual = vehicleReducer(stateWithFilters, resetFilters());
    expect(actual.filters).toBeNull();
    expect(actual.currentPage).toEqual(1);
  });

  it("should handle setSortBy", () => {
    const actual = vehicleReducer(
      initialState,
      setSortBy("price_asc" as const)
    );
    expect(actual.sortBy).toEqual("price_asc");
    expect(actual.currentPage).toEqual(1);
  });

  it("should handle fetchVehicles.pending", () => {
    const action = { type: fetchVehicles.pending.type };
    const actual = vehicleReducer(initialState, action);
    expect(actual.isLoading).toEqual(true);
    expect(actual.error).toBeNull();
  });

  it("should handle fetchVehicles.fulfilled", () => {
    const action = {
      type: fetchVehicles.fulfilled.type,
      payload: mockResponse,
    };
    const actual = vehicleReducer(initialState, action);
    expect(actual.isLoading).toEqual(false);
    expect(actual.vehicles).toEqual(mockResponse.data);
    expect(actual.totalPages).toEqual(mockResponse.last_page);
  });

  it("should handle fetchVehicles.rejected", () => {
    const action = {
      type: fetchVehicles.rejected.type,
      error: { message: "Failed to fetch" },
    };
    const actual = vehicleReducer(initialState, action);
    expect(actual.isLoading).toEqual(false);
    expect(actual.error).toEqual("Failed to fetch");
  });

  it("should handle fetchFilteredVehicles.pending", () => {
    const action = { type: fetchFilteredVehicles.pending.type };
    const actual = vehicleReducer(initialState, action);
    expect(actual.isLoading).toEqual(true);
    expect(actual.error).toBeNull();
  });

  it("should handle fetchFilteredVehicles.fulfilled", () => {
    const action = {
      type: fetchFilteredVehicles.fulfilled.type,
      payload: mockResponse,
    };
    const actual = vehicleReducer(initialState, action);
    expect(actual.isLoading).toEqual(false);
    expect(actual.vehicles).toEqual(mockResponse.data);
    expect(actual.totalPages).toEqual(mockResponse.last_page);
  });

  it("should handle fetchFilteredVehicles.rejected", () => {
    const action = {
      type: fetchFilteredVehicles.rejected.type,
      error: { message: "Failed to fetch filtered vehicles" },
    };
    const actual = vehicleReducer(initialState, action);
    expect(actual.isLoading).toEqual(false);
    expect(actual.error).toEqual("Failed to fetch filtered vehicles");
  });
});

describe("vehicleSlice thunks", () => {
  const mockResponse: VehicleResponse = {
    data: [
      {
        id: 1,
        brand: "Tesla",
        model: "Model S",
        year: 2023,
        price: 89990,
        range_km: 600,
        color: "Red",
        condition: "New",
        battery_capacity_kWh: 100,
        charging_speed_kW: 250,
        seats: 5,
        drivetrain: "AWD",
        location: "New York",
        autopilot: true,
        kilometer_count: 0,
        accidents: false,
        images: ["image1.jpg"],
      },
    ],
    total: 1,
    per_page: 10,
    current_page: 1,
    last_page: 2,
  };

  beforeEach(() => {
    (getVehicles as jest.Mock).mockClear();
  });

  it("should fetch vehicles successfully", async () => {
    (getVehicles as jest.Mock).mockResolvedValueOnce(mockResponse);

    const dispatch = jest.fn();
    const thunk = fetchVehicles({ page: 1, sort: null });
    await thunk(dispatch, () => ({}), undefined);

    const { calls } = dispatch.mock;
    expect(calls[0][0].type).toBe(fetchVehicles.pending.type);
    expect(calls[1][0].type).toBe(fetchVehicles.fulfilled.type);
    expect(calls[1][0].payload).toEqual(mockResponse);
  });

  it("should handle fetch vehicles error", async () => {
    const error = new Error("Failed to fetch");
    (getVehicles as jest.Mock).mockRejectedValueOnce(error);

    const dispatch = jest.fn();
    const thunk = fetchVehicles({ page: 1, sort: null });
    await thunk(dispatch, () => ({}), undefined);

    const { calls } = dispatch.mock;
    expect(calls[0][0].type).toBe(fetchVehicles.pending.type);
    expect(calls[1][0].type).toBe(fetchVehicles.rejected.type);
    expect(calls[1][0].error.message).toBe("Failed to fetch");
  });

  it("should fetch filtered vehicles successfully", async () => {
    (getVehicles as jest.Mock).mockResolvedValueOnce(mockResponse);

    const filters = {
      search: "tesla",
      sort: "price_asc" as const,
    };

    const dispatch = jest.fn();
    const thunk = fetchFilteredVehicles({ filters, page: 1 });
    await thunk(dispatch, () => ({}), undefined);

    const { calls } = dispatch.mock;
    expect(calls[0][0].type).toBe(fetchFilteredVehicles.pending.type);
    expect(calls[1][0].type).toBe(fetchFilteredVehicles.fulfilled.type);
    expect(calls[1][0].payload).toEqual(mockResponse);
    expect(getVehicles).toHaveBeenCalledWith(filters, 1);
  });
});
