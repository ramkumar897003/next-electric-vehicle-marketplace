'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VehicleType } from '@/features/vehicles/VehicleTypes';
import { Battery, Gauge, Users, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleProps {
    vehicle: VehicleType;
    isPriority?: boolean;
}

function Vehicle({ vehicle, isPriority = false }: VehicleProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const images = vehicle.images;

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div role="listitem">
            <div className="bg-white rounded-lg shadow-sm group h-full">
                {/* Image Section */}
                <div className="relative aspect-[16/9] rounded-t-lg overflow-hidden">
                    {images?.[currentImage] && (
                        <Image
                            src={images[currentImage]}
                            alt={`${vehicle.brand} ${vehicle.model} - View ${currentImage + 1} of ${images.length}`}
                            fill
                            priority={isPriority && currentImage === 0}
                            loading={isPriority ? "eager" : "lazy"}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={75}
                        />
                    )}

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.preventDefault(); prevImage(); }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={20} aria-hidden="true" />
                            </button>
                            <button
                                onClick={(e) => { e.preventDefault(); nextImage(); }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Next image"
                            >
                                <ChevronRight size={20} aria-hidden="true" />
                            </button>

                            {/* Image Indicators */}
                            <div
                                className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
                                role="tablist"
                                aria-label="Image navigation"
                            >
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => { e.preventDefault(); setCurrentImage(index); }}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${currentImage === index
                                            ? 'bg-white w-3'
                                            : 'bg-white/60 hover:bg-white/80'
                                            }`}
                                        role="tab"
                                        aria-selected={currentImage === index}
                                        aria-label={`View image ${index + 1} of ${images.length}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Condition Badge */}
                    <div className="absolute top-2 left-2">
                        <span
                            className={`
                                px-2 py-1 text-xs font-medium rounded-full
                                ${vehicle.condition === 'New'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'}
                            `}
                            role="status"
                        >
                            {vehicle.condition}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Header */}
                    <div className="mb-3">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {vehicle.brand} {vehicle.model}
                        </h2>
                        <p
                            className="text-xl font-bold text-blue-600"
                            aria-label={`Price: $${vehicle.price.toLocaleString()}`}
                        >
                            ${vehicle.price.toLocaleString()}
                        </p>
                    </div>

                    {/* Specs Grid */}
                    <div
                        className="grid grid-cols-2 gap-3 text-sm text-gray-600"
                        role="list"
                        aria-label="Vehicle specifications"
                    >
                        <div className="flex items-center gap-1" role="listitem">
                            <Battery size={16} aria-hidden="true" />
                            <p className="text-lg font-semibold" data-testid="battery-capacity">
                                {vehicle.battery_capacity_kWh} kWh
                            </p>
                        </div>
                        <div className="flex items-center gap-1" role="listitem">
                            <Gauge size={16} aria-hidden="true" />
                            <span aria-label="Range">{vehicle.range_km} km</span>
                        </div>
                        <div className="flex items-center gap-1" role="listitem">
                            <Users size={16} aria-hidden="true" />
                            <p className="text-lg font-semibold" data-testid="seats-count">
                                {vehicle.seats}
                            </p>
                        </div>
                        <div className="flex items-center gap-1" role="listitem">
                            <Zap size={16} aria-hidden="true" />
                            <span>Electric</span>
                        </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                        href={`/vehicles/${vehicle.id}`}
                        aria-label={`View details for ${vehicle.brand} ${vehicle.model}`}
                    >
                        <button
                            className="cursor-pointer w-full mt-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors group-hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Prevent unnecessary re-renders
export default React.memo(Vehicle);