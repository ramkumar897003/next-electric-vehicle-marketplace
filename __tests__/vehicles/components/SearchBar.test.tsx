import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/features/vehicles/components/SearchBar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters } from '@/features/vehicles/slices/vehicleSlice';

// Mock the Redux hooks
jest.mock('@/store/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn()
}));

describe('SearchBar Component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useAppSelector as jest.Mock).mockReturnValue({ filters: {} });
        jest.clearAllMocks();
    });

    it('renders search button correctly', () => {
        render(<SearchBar />);
        expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('opens search panel on button click', () => {
        render(<SearchBar />);
        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);

        expect(screen.getByPlaceholderText('Search by brand or model...')).toBeInTheDocument();
    });

    it('handles search input correctly', async () => {
        render(<SearchBar />);
        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);

        const searchInput = screen.getByPlaceholderText('Search by brand or model...');
        await userEvent.type(searchInput, 'tesla');

        expect(mockDispatch).toHaveBeenCalledWith(setFilters({
            search: 'tesla'
        }));
    });

    it('closes on ESC key', () => {
        render(<SearchBar />);
        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);

        fireEvent.keyDown(document, { key: 'Escape' });

        // Check for opacity-0 class which indicates hidden state
        const searchPanel = screen.getByPlaceholderText('Search by brand or model...').closest('div[style]');
        expect(searchPanel).toHaveClass('opacity-0');
    });

    it('closes on backdrop click', () => {
        render(<SearchBar />);
        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);

        // Find backdrop by class
        const backdrop = screen.getByTestId('search-backdrop');
        fireEvent.click(backdrop);

        const searchPanel = screen.getByPlaceholderText('Search by brand or model...').closest('div[style]');
        expect(searchPanel).toHaveClass('opacity-0');
    });
});
