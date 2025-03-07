import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchVehicles,
  fetchFilteredVehicles,
  setCurrentPage,
  setSortBy,
} from "../slices/vehicleSlice";

export function useVehicles() {
  const dispatch = useAppDispatch();
  const {
    vehicles,
    isLoading,
    error,
    totalPages,
    currentPage,
    filters,
    sortBy,
  } = useAppSelector((state) => state.vehicles);

  const getPriority = useCallback((index: number) => {
    return index < 6;
  }, []);

  const handleSort = useCallback(
    (value: string) => {
      dispatch(
        setSortBy(value === "default" ? null : (value as typeof sortBy))
      );
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  // Fetch data effect with debouncing for filters
  useEffect(() => {
    const fetchData = () => {
      if (filters) {
        dispatch(
          fetchFilteredVehicles({
            filters: {
              ...filters,
              sort: sortBy,
            },
            page: currentPage,
          })
        );
      } else {
        dispatch(
          fetchVehicles({
            page: currentPage,
            sort: sortBy,
          })
        );
      }
    };

    // Set a small delay to batch multiple filter changes
    const timeoutId = setTimeout(fetchData, 100);

    return () => clearTimeout(timeoutId);
  }, [dispatch, currentPage, filters, sortBy]);

  return {
    vehicles,
    isLoading,
    error,
    totalPages,
    currentPage,
    filters,
    sortBy,
    handleSort,
    handlePageChange,
    getPriority,
  };
}
