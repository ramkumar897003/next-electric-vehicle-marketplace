import { VehicleResponse, VehicleType } from "@/features/vehicles/VehicleTypes";

export interface VehicleFilters {
  priceRange?: [number, number];
  year?: number;
  condition?: ("New" | "Used")[];
  drivetrain?: ("FWD" | "RWD" | "AWD")[];
  range?: [number, number];
  autopilot?: boolean;
  noAccidents?: boolean;
  search?: string;
  sort?: "price_asc" | "price_desc" | "year_desc" | "range_desc" | null;
}

const API_URL = `/api/vehicles`;

/**
 * Fetches vehicles from the API with optional filters
 * @param filters Optional filters to apply
 * @param page Page number for pagination
 * @returns Promise<VehicleResponse>
 */
export async function getVehicles(
  filters?: VehicleFilters,
  page: number = 1
): Promise<VehicleResponse> {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    if (filters) {
      if (filters.priceRange) {
        params.append("minPrice", filters.priceRange[0].toString());
        params.append("maxPrice", filters.priceRange[1].toString());
      }

      if (filters.year) {
        params.append("year", filters.year.toString());
      }

      if (filters.condition?.length) {
        params.append("condition", filters.condition.join(","));
      }

      if (filters.drivetrain?.length) {
        params.append("drivetrain", filters.drivetrain.join(","));
      }

      if (filters.range) {
        params.append("minRange", filters.range[0].toString());
        params.append("maxRange", filters.range[1].toString());
      }

      if (filters.autopilot !== undefined) {
        params.append("autopilot", filters.autopilot.toString());
      }

      if (filters.noAccidents !== undefined) {
        params.append("noAccidents", filters.noAccidents.toString());
      }

      if (filters.search) {
        params.append("search", filters.search);
      }

      if (filters.sort) {
        params.append("orderBy", filters.sort);
      }
    }

    const response = await fetch(`${API_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as VehicleResponse;
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    throw error;
  }
}

/**
 * Fetches a single vehicle by ID
 * @param id Vehicle ID
 * @returns Promise<Vehicle>
 */
export async function getVehicleById(id: number): Promise<VehicleType> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as VehicleType;
  } catch (error) {
    console.error(`Failed to fetch vehicle with id ${id}:`, error);
    throw error;
  }
}
