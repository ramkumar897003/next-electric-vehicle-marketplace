import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVehicleById } from "../slices/vehicleDetailSlice";

export function useVehicleDetail(id: string) {
  const dispatch = useAppDispatch();
  const { vehicle, isLoading, error } = useAppSelector(
    (state) => state.vehicleDetail
  );

  useEffect(() => {
    dispatch(fetchVehicleById(id));
  }, [dispatch, id]);

  return { vehicle, isLoading, error };
}
