import { renderHook, act } from "@testing-library/react";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setCurrentPage,
  setSortBy,
} from "@/features/vehicles/slices/vehicleSlice";

// Mock Redux hooks
jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock async thunks
jest.mock("@/features/vehicles/slices/vehicleSlice", () => ({
  ...jest.requireActual("@/features/vehicles/slices/vehicleSlice"),
  fetchVehicles: jest.fn(),
  fetchFilteredVehicles: jest.fn(),
}));

describe("useVehicles", () => {
  const mockDispatch = jest.fn();
  const mockState = {
    vehicles: [
      {
        id: 1,
        brand: "Tesla",
        model: "Model S",
        images: ["image1.jpg"],
      },
    ],
    isLoading: false,
    error: null,
    totalPages: 2,
    currentPage: 1,
    filters: null,
    sortBy: null,
  };

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(mockState);
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => useVehicles());

    expect(result.current.vehicles).toEqual(mockState.vehicles);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle page changes", () => {
    const { result } = renderHook(() => useVehicles());

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setCurrentPage(2));
  });

  it("should handle sort changes", () => {
    const { result } = renderHook(() => useVehicles());

    act(() => {
      result.current.handleSort("price_asc");
    });

    expect(mockDispatch).toHaveBeenCalledWith(setSortBy("price_asc"));
  });

  it("should fetch vehicles on mount", () => {
    renderHook(() => useVehicles());

    jest.runAllTimers();

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should fetch filtered vehicles when filters exist", () => {
    const stateWithFilters = {
      ...mockState,
      filters: { search: "tesla" },
    };
    (useAppSelector as jest.Mock).mockReturnValue(stateWithFilters);

    renderHook(() => useVehicles());

    jest.runAllTimers();

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should determine priority correctly", () => {
    const { result } = renderHook(() => useVehicles());

    expect(result.current.getPriority(0)).toBe(true);
    expect(result.current.getPriority(5)).toBe(true);
    expect(result.current.getPriority(6)).toBe(false);
  });

  it("should debounce fetch requests", () => {
    const { rerender } = renderHook(() => useVehicles());

    rerender();
    rerender();

    jest.runAllTimers();

    // Should only be called once due to debouncing
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
