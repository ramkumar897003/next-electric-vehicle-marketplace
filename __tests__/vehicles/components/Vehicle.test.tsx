import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Vehicle from '@/features/vehicles/components/Vehicle';
import { VehicleType } from '@/features/vehicles/VehicleTypes';

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ fill, priority, ...props }: React.ComponentProps<'img'> & { fill?: boolean, priority?: boolean }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            {...props}
            alt={props.alt || ''}
            data-fill={fill ? "true" : undefined}
            data-priority={priority ? "true" : undefined}
        />
    )
}));

// Mock next/link
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode, href: string }) => (
        <a href={href}>{children}</a>
    )
}));

describe('Vehicle Component', () => {
    const mockVehicle: VehicleType = {
        id: 1,
        brand: 'Tesla',
        model: 'Model S',
        year: 2023,
        price: 89990,
        range_km: 600,
        color: 'Red',
        condition: 'New',
        battery_capacity_kWh: 100,
        charging_speed_kW: 250,
        seats: 5,
        drivetrain: 'AWD',
        location: 'New York',
        autopilot: true,
        kilometer_count: 0,
        accidents: false,
        images: [
            'image1.jpg',
            'image2.jpg',
            'image3.jpg'
        ]
    };

    it('renders vehicle information correctly', () => {
        render(<Vehicle vehicle={mockVehicle} />);

        // Check basic vehicle info - brand and model are rendered together
        expect(screen.getByText(`${mockVehicle.brand} ${mockVehicle.model}`)).toBeInTheDocument();

        // Check price with exact format
        expect(screen.getByLabelText(`Price: $${mockVehicle.price.toLocaleString()}`)).toBeInTheDocument();

        // Check range with aria-label
        expect(screen.getByLabelText('Range')).toHaveTextContent(`${mockVehicle.range_km} km`);
    });

    it('handles image navigation correctly', () => {
        render(<Vehicle vehicle={mockVehicle} />);

        // Get navigation buttons
        const nextButton = screen.getByLabelText('Next image');
        const prevButton = screen.getByLabelText('Previous image');

        // Initial image
        const image = screen.getByAltText('Tesla Model S - View 1 of 3');
        expect(image).toBeInTheDocument();

        // Test next navigation
        fireEvent.click(nextButton);
        expect(screen.getByAltText('Tesla Model S - View 2 of 3')).toBeInTheDocument();

        // Test previous navigation
        fireEvent.click(prevButton);
        expect(screen.getByAltText('Tesla Model S - View 1 of 3')).toBeInTheDocument();
    });

    it('prioritizes images correctly based on isPriority prop', () => {
        const { rerender } = render(<Vehicle vehicle={mockVehicle} isPriority={true} />);

        const priorityImage = screen.getByAltText('Tesla Model S - View 1 of 3');
        expect(priorityImage).toHaveAttribute('loading', 'eager');

        rerender(<Vehicle vehicle={mockVehicle} isPriority={false} />);
        const nonPriorityImage = screen.getByAltText('Tesla Model S - View 1 of 3');
        expect(nonPriorityImage).toHaveAttribute('loading', 'lazy');
    });

    it('displays vehicle features correctly', () => {
        render(<Vehicle vehicle={mockVehicle} />);

        // Check for feature values using data-testid
        const batteryCapacity = screen.getByTestId('battery-capacity');
        expect(batteryCapacity).toHaveTextContent(`${mockVehicle.battery_capacity_kWh} kWh`);

        // Check for range using aria-label
        const range = screen.getByLabelText('Range');
        expect(range).toHaveTextContent(`${mockVehicle.range_km} km`);

        // Check seats count
        const seatsCount = screen.getByTestId('seats-count');
        expect(seatsCount).toHaveTextContent(`${mockVehicle.seats}`);

        // Check for electric indicator
        expect(screen.getByText('Electric')).toBeInTheDocument();
    });

    it('renders link to vehicle detail page', () => {
        render(<Vehicle vehicle={mockVehicle} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/vehicles/${mockVehicle.id}`);
    });

    it('handles circular image navigation', () => {
        render(<Vehicle vehicle={mockVehicle} />);

        const nextButton = screen.getByLabelText('Next image');

        // Navigate to last image
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        expect(screen.getByAltText('Tesla Model S - View 3 of 3')).toBeInTheDocument();

        // Should wrap to first image
        fireEvent.click(nextButton);
        expect(screen.getByAltText('Tesla Model S - View 1 of 3')).toBeInTheDocument();
    });

    it('applies proper accessibility attributes', () => {
        render(<Vehicle vehicle={mockVehicle} />);

        // Check for proper ARIA labels
        const listItems = screen.getAllByRole('listitem');
        expect(listItems.length).toBeGreaterThan(0); // Verify we have list items

        expect(screen.getByLabelText('Next image')).toBeInTheDocument();
        expect(screen.getByLabelText('Previous image')).toBeInTheDocument();

        // Check that icons are properly hidden from screen readers
        const icons = document.querySelectorAll('[aria-hidden="true"]');
        expect(icons.length).toBeGreaterThan(0);
    });
});
