import { NextResponse } from "next/server";
import { VehicleType } from "@/features/vehicles/VehicleTypes";
import { getVehiclesData } from "../route";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    const { data } = await getVehiclesData();

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
