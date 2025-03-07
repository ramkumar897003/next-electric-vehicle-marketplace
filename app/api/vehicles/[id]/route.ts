import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { VehicleType } from "@/features/vehicles/VehicleTypes";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const jsonPath = path.join(
      process.cwd(),
      "public",
      "data",
      "vehicle_data.json"
    );

    const jsonData = await fs.readFile(jsonPath, "utf-8");
    const { data } = JSON.parse(jsonData);

    const vehicle = data.find((v: VehicleType) => v.id === parseInt(params.id));

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicle" },
      { status: 500 }
    );
  }
}
