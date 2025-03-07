import {
  getVehicles,
  getVehicleById,
} from "@/features/vehicles/services/VehicleService";
import { VehicleResponse } from "@/features/vehicles/VehicleTypes";

// Mock fetch
global.fetch = jest.fn();

describe("VehicleService", () => {
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
    last_page: 1,
  };

  const mockVehicle = {
    id: 1,
    brand: "Tesla",
    model: "Model S",
    // ... other vehicle properties
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getVehicles", () => {
    it("fetches vehicles without filters", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getVehicles();

      expect(fetch).toHaveBeenCalledWith("/api/vehicles?page=1");
      expect(result).toEqual(mockResponse);
    });

    it("fetches vehicles with all filters", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const filters = {
        priceRange: [50000, 100000] as [number, number],
        year: 2023,
        condition: ["New"] as ["New" | "Used"],
        drivetrain: ["AWD"] as ["FWD" | "RWD" | "AWD"],
        range: [400, 600] as [number, number],
        autopilot: true,
        noAccidents: true,
        search: "tesla",
        sort: "price_asc" as const,
      };

      await getVehicles(filters, 1);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/vehicles?page=1")
      );
      const url = (fetch as jest.Mock).mock.calls[0][0];
      const params = new URLSearchParams(url.split("?")[1]);

      expect(params.get("minPrice")).toBe("50000");
      expect(params.get("maxPrice")).toBe("100000");
      expect(params.get("year")).toBe("2023");
      expect(params.get("condition")).toBe("New");
      expect(params.get("drivetrain")).toBe("AWD");
      expect(params.get("minRange")).toBe("400");
      expect(params.get("maxRange")).toBe("600");
      expect(params.get("autopilot")).toBe("true");
      expect(params.get("noAccidents")).toBe("true");
      expect(params.get("search")).toBe("tesla");
      expect(params.get("orderBy")).toBe("price_asc");
    });

    it("handles API errors", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getVehicles()).rejects.toThrow("HTTP error! status: 500");
    });

    it("handles network errors", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(getVehicles()).rejects.toThrow("Network error");
    });
  });

  describe("getVehicleById", () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockVehicle),
      });
    });

    it("fetches a single vehicle by id", async () => {
      const result = await getVehicleById(1);

      expect(fetch).toHaveBeenCalledWith("/api/vehicles/1");
      expect(result).toEqual(mockVehicle);
    });

    it("handles fetch errors", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(getVehicleById(1)).rejects.toThrow(
        "HTTP error! status: 404"
      );
    });

    it("handles network errors", async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      await expect(getVehicleById(1)).rejects.toThrow("Network error");
    });
  });
});
