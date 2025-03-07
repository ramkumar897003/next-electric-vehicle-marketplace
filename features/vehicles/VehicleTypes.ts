export interface VehicleResponse {
  data: VehicleType[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface VehicleType {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  range_km: number;
  color: string;
  condition: "New" | "Used";
  battery_capacity_kWh: number;
  charging_speed_kW: number;
  seats: number;
  drivetrain: "FWD" | "RWD" | "AWD";
  location: string;
  autopilot: boolean;
  kilometer_count: number;
  accidents: boolean;
  accident_description?: string;
  images: string[];
}
