'use client'

import React from 'react'
import FiltersWrapper from './components/FiltersWrapper'
import Vehicle from './components/Vehicle'
import { useVehicles } from './hooks/useVehicles'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function VehicleListing() {
    const {
        vehicles,
        isLoading,
        error,
        totalPages,
        currentPage,
        sortBy,
        handleSort,
        handlePageChange,
        getPriority
    } = useVehicles();

    return (
        <main className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Filters Sidebar */}
                <aside
                    className="md:w-80 flex-shrink-0"
                    aria-label="Vehicle filters"
                >
                    <div className="sticky top-24">
                        <FiltersWrapper />
                    </div>
                </aside>

                <section
                    className="flex-1"
                    aria-label="Vehicle listings"
                >
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold">Available Vehicles</h1>
                            <div className="flex items-center gap-2">
                                <label id="sort-label" className="text-sm text-gray-600">Sort By</label>
                                <Select
                                    value={sortBy || 'default'}
                                    onValueChange={handleSort}
                                    aria-labelledby="sort-label"
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Default</SelectItem>
                                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                                        <SelectItem value="year_desc">Newest First</SelectItem>
                                        <SelectItem value="range_desc">Longest Range</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div
                                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                                aria-label="Loading vehicles"
                            >
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-[400px] bg-gray-100 rounded-lg animate-pulse"
                                        role="presentation"
                                    />
                                ))}
                            </div>
                        ) : error ? (
                            <div
                                className="text-center py-12"
                                role="alert"
                                aria-live="polite"
                            >
                                <p className="text-red-600 mb-4">{error}</p>
                                <button
                                    onClick={() => handlePageChange(currentPage)}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : vehicles.length === 0 ? (
                            <div
                                className="text-center py-12"
                                role="alert"
                                aria-live="polite"
                            >
                                <p className="text-gray-600 mb-4">No vehicles found matching your criteria</p>
                                <button
                                    onClick={() => handlePageChange(1)}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div
                                    className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                                    role="list"
                                    aria-label="Vehicle listings"
                                >
                                    {vehicles.map((vehicle, index) => (
                                        <Vehicle
                                            key={vehicle.id}
                                            vehicle={vehicle}
                                            isPriority={getPriority(index)}
                                        />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <nav
                                        className="mt-8"
                                        aria-label="Pagination"
                                    >
                                        <ReactPaginate
                                            pageCount={totalPages}
                                            pageRangeDisplayed={2}
                                            marginPagesDisplayed={2}
                                            onPageChange={({ selected }) => handlePageChange(selected + 1)}
                                            forcePage={currentPage - 1}
                                            className="flex items-center justify-center gap-1"
                                            pageClassName="rounded-md overflow-hidden"
                                            pageLinkClassName="rounded-md overflow-hidden cursor-pointer w-10 h-10 flex items-center justify-center bg-white border text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                            activeClassName="[&>a]:bg-blue-50 [&>a]:text-blue-600 [&>a]:border-blue-200 [&>a]:font-medium"
                                            previousClassName="rounded-md overflow-hidden"
                                            nextClassName="rounded-md overflow-hidden"
                                            previousLinkClassName="rounded-md overflow-hidden cursor-pointer w-10 h-10 flex items-center justify-center bg-white border text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                            nextLinkClassName="rounded-md overflow-hidden cursor-pointer w-10 h-10 flex items-center justify-center bg-white border text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                            disabledClassName="opacity-50 cursor-not-allowed pointer-events-none"
                                            breakLabel="..."
                                            breakClassName="self-center text-gray-400"
                                            previousLabel={<ChevronLeft className="w-4 h-4" aria-hidden="true" />}
                                            nextLabel={<ChevronRight className="w-4 h-4" aria-hidden="true" />}
                                            ariaLabelBuilder={(page) => `Go to page ${page}`}
                                        />
                                    </nav>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default VehicleListing;