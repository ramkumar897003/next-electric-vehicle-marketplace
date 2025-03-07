'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { X, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SearchBarWrapper from '@/features/vehicles/components/SearchBarWrapper';

export default function Header() {
    const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const isActive = (path: string) => {
        return {
            className: pathname === path ? 'text-blue-600' : 'text-gray-600',
            'aria-current': pathname === path ? 'page' as const : undefined
        };
    };

    const toggleDrawer = useCallback(() => {
        setIsDrawerOpen(!isDrawerOpen);
        document.body.style.overflow = !isDrawerOpen ? 'hidden' : '';
    }, [isDrawerOpen]);

    // Close drawer on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isDrawerOpen) {
                toggleDrawer();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isDrawerOpen, toggleDrawer]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded p-1"
                        aria-label="VehicleHub Home"
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                        >
                            <path
                                d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 7.5l12.5 6.25v12.5L20 32.5 7.5 26.25V13.75L20 7.5z"
                                fill="#2563eb"
                            />
                        </svg>
                        <span className="ml-2 text-xl font-bold text-gray-900">VehicleHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav
                        className="hidden md:flex items-center space-x-8"
                        aria-label="Main navigation"
                    >
                        <Link href="/vehicles" {...isActive('/vehicles')}>
                            Vehicles
                        </Link>
                        <Link href="/about" {...isActive('/about')}>
                            About
                        </Link>
                        <Link href="/contact" {...isActive('/contact')}>
                            Contact
                        </Link>
                        <SearchBarWrapper />

                        <Link
                            href="/quote"
                            className={`${pathname === '/quote'
                                ? 'bg-blue-700'
                                : 'bg-blue-600 hover:bg-blue-700'
                                } text-white px-4 py-2 rounded-md transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none`}
                            aria-current={pathname === '/quote' ? 'page' : undefined}
                        >
                            Get A Quote
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={toggleDrawer}
                        className="md:hidden text-gray-600 hover:text-gray-900 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isDrawerOpen}
                        aria-controls="mobile-menu"
                    >
                        {isDrawerOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </div>
            </header>

            {/* Mobile Drawer Backdrop */}
            <div
                className={`fixed inset-0 bg-gray-200 bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleDrawer}
                aria-hidden="true"
            />

            {/* Mobile Drawer */}
            <div
                id="mobile-menu"
                className={`fixed top-20 right-0 h-[calc(100vh-5rem)] w-full sm:w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                role="dialog"
                aria-modal="true"
                aria-label="Main menu"
            >
                <nav className="flex flex-col h-full" aria-label="Mobile navigation">
                    <div className="p-4 space-y-4 flex-1">
                        <div className="mb-4">
                            <SearchBarWrapper />
                        </div>
                        <div className="space-y-2">
                            <Link
                                href="/vehicles"
                                className={`block px-4 py-3 hover:bg-gray-50 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none ${isActive('/vehicles').className}`}
                                onClick={toggleDrawer}
                                aria-current={pathname === '/vehicles' ? 'page' : undefined}
                            >
                                Vehicles
                            </Link>
                            <Link
                                href="/about"
                                className={`block px-4 py-3 hover:bg-gray-50 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none ${isActive('/about').className}`}
                                onClick={toggleDrawer}
                                aria-current={pathname === '/about' ? 'page' : undefined}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className={`block px-4 py-3 hover:bg-gray-50 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none ${isActive('/contact').className}`}
                                onClick={toggleDrawer}
                                aria-current={pathname === '/contact' ? 'page' : undefined}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-100">
                        <Link
                            href="/quote"
                            className="block w-full text-center bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 transition-colors rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onClick={toggleDrawer}
                            aria-current={pathname === '/quote' ? 'page' : undefined}
                        >
                            Get A Quote
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}