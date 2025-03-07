import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import VehicleListing from "@/features/vehicles/VehicleListing";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import vehicleReducer from "@/features/vehicles/slices/vehicleSlice";

jest.mock("@/components/ui/select", () => ({
    Select: ({ onValueChange }: { onValueChange: (value: string) => void }) => (
        <div data-testid="sort-select" onClick={() => onValueChange("price_asc")}>Sort By</div>
    ),
    SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SelectItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SelectValue: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/components/ui/slider", () => ({
    Slider: () => <div data-testid="mock-slider" />,
}));

jest.mock("@/components/ui/checkbox", () => ({
    Checkbox: () => <div data-testid="mock-checkbox" />,
}));

jest.mock("@/components/ui/label", () => ({
    Label: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("@/features/vehicles/components/Filters", () => ({
    __esModule: true,
    default: () => <div data-testid="mock-filters">Filters</div>,
}));

jest.mock("@/features/vehicles/components/Vehicle", () => ({
    __esModule: true,
    default: () => <div data-testid="mock-vehicle">Vehicle</div>,
}));

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: { src: string; alt: string; width?: number; height?: number; className?: string }) => <img {...props} />,
}));

jest.mock("@/features/vehicles/hooks/useVehicles");

const renderWithProviders = (
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = configureStore({
            reducer: { vehicles: vehicleReducer },
            preloadedState,
        }),
        ...renderOptions
    } = {}
) => {
    function Wrapper({ children }: { children: React.ReactNode }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

describe("VehicleListing", () => {
    const mockVehicles = [
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
            images: ["/images/tesla-model-s.jpg"],
        },
    ];

    const mockUseVehicles = {
        vehicles: mockVehicles,
        isLoading: false,
        error: null,
        totalPages: 2,
        currentPage: 1,
        sortBy: null,
        handleSort: jest.fn(),
        handlePageChange: jest.fn(),
        getPriority: jest.fn(),
    };

    beforeEach(() => {
        (useVehicles as jest.Mock).mockReturnValue(mockUseVehicles);
    });

    it("renders vehicle listings", async () => {
        await act(async () => {
            renderWithProviders(<VehicleListing />);
        });
        expect(screen.getByText("Available Vehicles")).toBeInTheDocument();
    });

    it("displays loading state", () => {
        (useVehicles as jest.Mock).mockReturnValue({
            ...mockUseVehicles,
            isLoading: true,
        });

        renderWithProviders(<VehicleListing />);
        const loadingElements = screen.getAllByRole("presentation");
        expect(loadingElements.length).toBe(6);
    });

    it("displays error state", () => {
        (useVehicles as jest.Mock).mockReturnValue({
            ...mockUseVehicles,
            error: "Failed to fetch vehicles",
        });

        renderWithProviders(<VehicleListing />);
        expect(screen.getByText("Failed to fetch vehicles")).toBeInTheDocument();
        expect(screen.getByText("Try Again")).toBeInTheDocument();
    });

    it("displays empty state", () => {
        (useVehicles as jest.Mock).mockReturnValue({
            ...mockUseVehicles,
            vehicles: [],
        });

        renderWithProviders(<VehicleListing />);
        expect(
            screen.getByText("No vehicles found matching your criteria")
        ).toBeInTheDocument();
        expect(screen.getByText("Clear Filters")).toBeInTheDocument();
    });

    it("handles sort changes", async () => {
        await act(async () => {
            renderWithProviders(<VehicleListing />);
        });

        const sortSelect = screen.getByTestId("sort-select");
        await act(async () => {
            fireEvent.click(sortSelect);
        });

        expect(mockUseVehicles.handleSort).toHaveBeenCalledWith("price_asc");
    });

    it("handles page changes", async () => {
        await act(async () => {
            renderWithProviders(<VehicleListing />);
        });

        const nextButton = screen.getByRole("button", { name: /next page/i });
        await act(async () => {
            fireEvent.click(nextButton);
        });

        expect(mockUseVehicles.handlePageChange).toHaveBeenCalledWith(2);
    });

    it("maintains accessibility features", () => {
        renderWithProviders(<VehicleListing />);
        expect(screen.getByTestId("mock-filters")).toBeInTheDocument();
        expect(screen.getByText("Available Vehicles")).toBeInTheDocument();
    });
});
