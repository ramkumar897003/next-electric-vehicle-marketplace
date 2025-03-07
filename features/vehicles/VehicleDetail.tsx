'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Battery, Gauge, Users, Zap, MapPin, Car, Shield, AlertTriangle } from 'lucide-react';
import { useVehicleDetail } from './hooks/useVehicleDetail';

interface VehicleDetailProps {
    id: string;
}

export default function VehicleDetail({ id }: VehicleDetailProps) {
    const { vehicle, isLoading, error } = useVehicleDetail(id);
    const [currentImage, setCurrentImage] = useState(0);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-[400px] bg-gray-200 rounded-lg mb-4" />
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-2/3" />
                        <div className="h-6 bg-gray-200 rounded w-1/3" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-600">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!vehicle) {
        return null;
    }

    const images = vehicle.images;

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="cursor-pointer mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Back to vehicles list"
            >
                <ChevronLeft size={20} aria-hidden="true" />
                <span>Back to Vehicles</span>
            </button>

            <div className="grid lg:grid-cols-2 gap-8" role="main">
                {/* Left Column - Images */}
                <div className="space-y-4">
                    <div
                        className="relative aspect-[16/9] w-full bg-gray-100 rounded-lg overflow-hidden"
                        role="region"
                        aria-label="Vehicle images gallery"
                    >
                        {images?.[currentImage] && (
                            <Image
                                src={images[currentImage]}
                                alt={`${vehicle.brand} ${vehicle.model} - View ${currentImage + 1} of ${images.length}`}
                                fill
                                priority
                                loading="eager"
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}

                        {/* Image Navigation */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} aria-hidden="true" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} aria-hidden="true" />
                        </button>

                        {/* Image Indicators */}
                        <div
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                            role="tablist"
                            aria-label="Image gallery navigation"
                        >
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImage(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${currentImage === index
                                        ? 'bg-white w-4'
                                        : 'bg-white/60 hover:bg-white/80'
                                        }`}
                                    role="tab"
                                    aria-selected={currentImage === index}
                                    aria-label={`View image ${index + 1} of ${images.length}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Thumbnail Grid */}
                    <div
                        className="grid grid-cols-4 gap-2"
                        role="tablist"
                        aria-label="Thumbnail images"
                    >
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`relative aspect-[4/3] rounded-lg overflow-hidden ${currentImage === index ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                role="tab"
                                aria-selected={currentImage === index}
                                aria-label={`Select image ${index + 1}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${vehicle.brand} ${vehicle.model} thumbnail ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 12vw, 8vw"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {vehicle.brand} {vehicle.model}
                        </h1>
                        <p className="text-2xl font-bold text-blue-600 mt-2" aria-label="Price">
                            ${vehicle.price.toLocaleString()}
                        </p>
                    </div>

                    {/* Key Specs Grid */}
                    <div className="grid grid-cols-2 gap-4" role="list" aria-label="Vehicle specifications">
                        <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <Battery size={18} aria-hidden="true" />
                                <span className="text-sm">Battery Capacity</span>
                            </div>
                            <p className="text-lg font-semibold" aria-label={`Battery capacity: ${vehicle.battery_capacity_kWh} kilowatt hours`}>
                                {vehicle.battery_capacity_kWh} kWh
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <Gauge size={18} aria-hidden="true" />
                                <span className="text-sm">Range</span>
                            </div>
                            <p className="text-lg font-semibold" aria-label={`Range: ${vehicle.range_km} kilometers`}>
                                {vehicle.range_km} km
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <Zap size={18} aria-hidden="true" />
                                <span className="text-sm">Charging Speed</span>
                            </div>
                            <p className="text-lg font-semibold" aria-label={`Charging speed: ${vehicle.charging_speed_kW} kilowatts`}>
                                {vehicle.charging_speed_kW} kW
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg" role="listitem">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <Users size={18} aria-hidden="true" />
                                <span className="text-sm">Seats</span>
                            </div>
                            <p className="text-lg font-semibold" aria-label={`${vehicle.seats} seats`}>
                                {vehicle.seats}
                            </p>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-4" role="list" aria-label="Additional vehicle details">
                        <div className="flex items-center gap-2 text-gray-600" role="listitem">
                            <MapPin size={18} aria-hidden="true" />
                            <span aria-label={`Location: ${vehicle.location}`}>Location: {vehicle.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600" role="listitem">
                            <Car size={18} aria-hidden="true" />
                            <span aria-label={`Drivetrain: ${vehicle.drivetrain}`}>Drivetrain: {vehicle.drivetrain}</span>
                        </div>
                        {vehicle.autopilot && (
                            <div className="flex items-center gap-2 text-green-600" role="listitem">
                                <Shield size={18} aria-hidden="true" />
                                <span>Autopilot Equipped</span>
                            </div>
                        )}
                        {vehicle.accidents && (
                            <div className="flex items-start gap-2 text-amber-600" role="listitem">
                                <AlertTriangle size={18} className="flex-shrink-0 mt-1" aria-hidden="true" />
                                <div>
                                    <p className="font-medium">Accident History</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {vehicle.accident_description || 'Previous accident reported'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Button */}
                    <button
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Contact seller about this vehicle"
                    >
                        Contact Seller
                    </button>
                </div>
            </div>
        </div>
    );
}