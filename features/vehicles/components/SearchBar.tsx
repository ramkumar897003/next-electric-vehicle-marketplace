'use client'

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters } from '../slices/vehicleSlice';

export function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useAppDispatch();
    const { filters } = useAppSelector(state => state.vehicles);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        dispatch(setFilters({
            ...filters,
            search: value || undefined
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsOpen(false);
        }
    };

    return (
        <div className="static md:relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Search"
            >
                <Search size={20} />
                <span className="text-sm">Search</span>
            </button>

            {/* Search Panel */}
            <div
                style={{ position: 'fixed', top: '80px' }}
                className={`
                    left-0 right-8 h-auto md:left-auto md:absolute w-full md:w-[400px] 
                    md:top-[calc(100%+0.75rem)] bg-white shadow-xl md:rounded-xl border
                    transform transition-all duration-200 origin-top md:origin-top-right z-[9999]
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                `}
            >
                <div className="p-4">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search by brand or model..."
                            className="w-full pl-10 pr-10 py-3 bg-gray-50 border-0 rounded-lg 
                                     text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                                     placeholder:text-gray-400 transition-all"
                            autoFocus
                        />
                        {searchTerm && (
                            <button
                                onClick={() => {
                                    handleSearch('');
                                    setIsOpen(false);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 
                                         p-1 hover:bg-gray-100 rounded-full
                                         text-gray-400 hover:text-gray-600 transition-all"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <div className="mt-3 text-xs text-gray-400">
                        Press ESC to close
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div
                data-testid="search-backdrop"
                style={{ position: 'fixed' }}
                className={`                    inset-0 bg-black/20 backdrop-blur-sm z-[9998]
                    transition-opacity duration-200
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setIsOpen(false)}
            />
        </div>
    );
} 
