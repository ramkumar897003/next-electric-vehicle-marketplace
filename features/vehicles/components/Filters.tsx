'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from '@/store/hooks';
import { setFilters, resetFilters } from '../slices/vehicleSlice';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Filters() {
    const dispatch = useAppDispatch();

    const [yearValue, setYearValue] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [rangeKm, setRangeKm] = useState<[number, number]>([0, 800]);
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [selectedDrivetrains, setSelectedDrivetrains] = useState<string[]>([]);
    const [autopilot, setAutopilot] = useState(false);
    const [noAccidents, setNoAccidents] = useState(false);

    const handleReset = useCallback(() => {
        setYearValue('');
        setPriceRange([0, 200000]);
        setRangeKm([0, 800]);
        setSelectedConditions([]);
        setSelectedDrivetrains([]);
        setAutopilot(false);
        setNoAccidents(false);
        dispatch(resetFilters());
    }, [dispatch]);

    // Memoize complex computations
    const yearOptions = useMemo(() =>
        Array.from({ length: 10 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return year;
        }),
        []
    );

    // Memoize checkbox handlers
    const handleConditionChange = useCallback((condition: string) => (checked: boolean) => {
        setSelectedConditions(prev =>
            checked
                ? [...prev, condition]
                : prev.filter(c => c !== condition)
        );
    }, []);

    const handleDrivetrainChange = useCallback((drive: string) => (checked: boolean) => {
        setSelectedDrivetrains(prev =>
            checked
                ? [...prev, drive]
                : prev.filter(d => d !== drive)
        );
    }, []);

    // Update filters when local state changes
    useEffect(() => {
        dispatch(setFilters({
            year: yearValue ? parseInt(yearValue) : undefined,
            priceRange: priceRange[0] === 0 && priceRange[1] === 200000 ? undefined : priceRange,
            range: rangeKm[0] === 0 && rangeKm[1] === 800 ? undefined : rangeKm,
            condition: selectedConditions.length > 0 ? selectedConditions as ("New" | "Used")[] : undefined,
            drivetrain: selectedDrivetrains.length > 0 ? selectedDrivetrains as ("FWD" | "RWD" | "AWD")[] : undefined,
            autopilot: autopilot || undefined,
            noAccidents: noAccidents || undefined,
        }));
    }, [yearValue, priceRange, rangeKm, selectedConditions, selectedDrivetrains, autopilot, noAccidents, dispatch]);

    return (
        <form
            className="w-full bg-white p-6 rounded-lg shadow-sm"
            role="search"
            aria-label="Vehicle filters"
        >
            <h2 className="text-xl font-semibold mb-6" id="filters-heading">Filters</h2>

            {/* Price Range */}
            <fieldset className="mb-6">
                <legend className="text-sm font-medium mb-3">Price Range</legend>
                <div className="space-y-4">
                    <div className="relative pt-6">
                        <Slider
                            value={priceRange}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                            min={0}
                            max={200000}
                            step={1000}
                            className="w-full"
                            aria-label="Price range slider"
                            aria-valuemin={0}
                            aria-valuemax={200000}
                            aria-valuenow={priceRange[1]}
                            aria-valuetext={`$${priceRange[0].toLocaleString()} to $${priceRange[1].toLocaleString()}`}
                        />
                        <div className="absolute -top-1 left-0 right-0 text-center">
                            <span className="bg-white px-2 text-sm text-gray-600" aria-live="polite">
                                ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500" aria-hidden="true">
                        <span>$0</span>
                        <span>$200,000+</span>
                    </div>
                </div>
            </fieldset>

            {/* Year Range */}
            <fieldset className="mb-6">
                <legend className="text-sm font-medium mb-3">Year</legend>
                <Select
                    value={yearValue}
                    onValueChange={setYearValue}
                    aria-label="Select vehicle year"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {yearOptions.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </fieldset>

            {/* Condition */}
            <fieldset className="mb-6">
                <legend className="text-sm font-medium mb-3">Condition</legend>
                <div className="space-y-2" role="group" aria-label="Vehicle condition options">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="new"
                            checked={selectedConditions.includes('New')}
                            onCheckedChange={handleConditionChange('New')}
                            aria-describedby="condition-new-label"
                        />
                        <Label htmlFor="new" id="condition-new-label">New</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="used"
                            checked={selectedConditions.includes('Used')}
                            onCheckedChange={handleConditionChange('Used')}
                            aria-describedby="condition-used-label"
                        />
                        <Label htmlFor="used" id="condition-used-label">Used</Label>
                    </div>
                </div>
            </fieldset>

            {/* Drivetrain */}
            <fieldset className="mb-6">
                <legend className="text-sm font-medium mb-3">Drivetrain</legend>
                <div className="space-y-2" role="group" aria-label="Drivetrain options">
                    {["FWD", "RWD", "AWD"].map((drive) => (
                        <div key={drive} className="flex items-center space-x-2">
                            <Checkbox
                                id={drive.toLowerCase()}
                                checked={selectedDrivetrains.includes(drive)}
                                onCheckedChange={handleDrivetrainChange(drive)}
                                aria-describedby={`drivetrain-${drive.toLowerCase()}-label`}
                            />
                            <Label
                                htmlFor={drive.toLowerCase()}
                                id={`drivetrain-${drive.toLowerCase()}-label`}
                            >
                                {drive}
                            </Label>
                        </div>
                    ))}
                </div>
            </fieldset>

            {/* Features */}
            <fieldset className="mb-6">
                <legend className="text-sm font-medium mb-3">Features</legend>
                <div className="space-y-2" role="group" aria-label="Vehicle features">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="autopilot"
                            checked={autopilot}
                            onCheckedChange={(checked) => setAutopilot(checked as boolean)}
                            aria-describedby="feature-autopilot-label"
                        />
                        <Label htmlFor="autopilot" id="feature-autopilot-label">Autopilot</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="no-accidents"
                            checked={noAccidents}
                            onCheckedChange={(checked) => setNoAccidents(checked as boolean)}
                            aria-describedby="feature-accidents-label"
                        />
                        <Label htmlFor="no-accidents" id="feature-accidents-label">No Accidents</Label>
                    </div>
                </div>
            </fieldset>

            {/* Range */}
            <fieldset className="mb-6">
                <legend className="text-sm font-medium mb-3">Range (km)</legend>
                <div className="space-y-4">
                    <div className="relative pt-6">
                        <Slider
                            value={rangeKm}
                            onValueChange={(value) => setRangeKm(value as [number, number])}
                            min={0}
                            max={800}
                            step={10}
                            className="w-full"
                            aria-label="Range slider"
                            aria-valuemin={0}
                            aria-valuemax={800}
                            aria-valuenow={rangeKm[1]}
                            aria-valuetext={`${rangeKm[0]} to ${rangeKm[1]} kilometers`}
                        />
                        <div className="absolute -top-1 left-0 right-0 text-center">
                            <span className="bg-white px-2 text-sm text-gray-600" aria-live="polite">
                                {rangeKm[0]} - {rangeKm[1]} km
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500" aria-hidden="true">
                        <span>0 km</span>
                        <span>800 km</span>
                    </div>
                </div>
            </fieldset>

            {/* Reset Button */}
            <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer w-full py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Reset all filters"
            >
                Reset Filters
            </button>
        </form>
    );
}