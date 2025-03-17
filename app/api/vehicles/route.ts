import { NextResponse } from "next/server";
import { VehicleResponse } from "@/features/vehicles/VehicleTypes";
import path from "path";
import fs from "fs/promises";
import { VehicleType } from "@/features/vehicles/VehicleTypes";

const ITEMS_PER_PAGE = 6;

export async function getVehiclesData(): Promise<VehicleResponse> {
  // Get the path to the JSON file
  const jsonPath = path.join(
    process.cwd(),
    "public",
    "data",
    "vehicle_data.json"
  );

  // Read and parse the JSON file
  const jsonData = await fs.readFile(jsonPath, "utf-8");
  return JSON.parse(jsonData);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const orderBy = searchParams.get("orderBy");

    // Get filter parameters
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const year = searchParams.get("year");
    const condition = searchParams.get("condition")?.split(",");
    const drivetrain = searchParams.get("drivetrain")?.split(",");
    const minRange = searchParams.get("minRange");
    const maxRange = searchParams.get("maxRange");
    const autopilot = searchParams.get("autopilot");
    const noAccidents = searchParams.get("noAccidents");
    const search = searchParams.get("search");

    // Get vehicles data from JSON file
    const vehiclesData = await getVehiclesData();

    // Apply filters
    let filteredVehicles = [...vehiclesData.data];

    if (minPrice && maxPrice) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.price >= Number(minPrice) && v.price <= Number(maxPrice)
      );
    }

    if (year) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.year === Number(year)
      );
    }

    if (condition?.length) {
      filteredVehicles = filteredVehicles.filter((v) =>
        condition.includes(v.condition)
      );
    }

    if (drivetrain?.length) {
      filteredVehicles = filteredVehicles.filter((v) =>
        drivetrain.includes(v.drivetrain)
      );
    }

    if (minRange && maxRange) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.range_km >= Number(minRange) && v.range_km <= Number(maxRange)
      );
    }

    if (autopilot) {
      filteredVehicles = filteredVehicles.filter(
        (v) => v.autopilot === (autopilot === "true")
      );
    }

    if (noAccidents) {
      filteredVehicles = filteredVehicles.filter((v) => v.accidents === false);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredVehicles = filteredVehicles.filter(
        (v) =>
          v.brand.toLowerCase().includes(searchLower) ||
          v.model.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (orderBy) {
      filteredVehicles.sort((a: VehicleType, b: VehicleType) => {
        switch (orderBy) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "year_desc":
            return b.year - a.year;
          case "range_desc":
            return b.range_km - a.range_km;
          default:
            return 0;
        }
      });
    }

    // Calculate pagination values
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const total = filteredVehicles.length;
    const last_page = Math.ceil(total / ITEMS_PER_PAGE);

    // Get paginated data
    const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedVehicles,
      total,
      per_page: ITEMS_PER_PAGE,
      current_page: page,
      last_page,
    });
  } catch (error) {
    // Handle any errors and return 500 status code
    console.error("Error reading vehicle data:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
