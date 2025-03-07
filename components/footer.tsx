import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="bg-gray-900 text-gray-300"
            role="contentinfo"
            aria-label="Site footer"
        >
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h2 className="text-white text-lg font-semibold mb-4">VehicleHub</h2>
                        <p className="text-sm mb-4">
                            Your trusted partner in finding the perfect vehicle. We provide quality vehicles and exceptional service.
                        </p>
                        <div
                            className="flex space-x-4"
                            role="navigation"
                            aria-label="Social media links"
                        >
                            <Link
                                href="https://facebook.com"
                                className="hover:text-white transition-colors p-2 focus:ring-2 focus:ring-white focus:outline-none rounded-full"
                                aria-label="Visit our Facebook page"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook size={20} aria-hidden="true" />
                            </Link>
                            <Link
                                href="https://twitter.com"
                                className="hover:text-white transition-colors p-2 focus:ring-2 focus:ring-white focus:outline-none rounded-full"
                                aria-label="Visit our Twitter page"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter size={20} aria-hidden="true" />
                            </Link>
                            <Link
                                href="https://instagram.com"
                                className="hover:text-white transition-colors p-2 focus:ring-2 focus:ring-white focus:outline-none rounded-full"
                                aria-label="Visit our Instagram page"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram size={20} aria-hidden="true" />
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                className="hover:text-white transition-colors p-2 focus:ring-2 focus:ring-white focus:outline-none rounded-full"
                                aria-label="Visit our LinkedIn page"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin size={20} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <nav aria-label="Quick links">
                        <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/vehicles"
                                    className="hover:text-white transition-colors inline-block p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                >
                                    Browse Vehicles
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-white transition-colors inline-block p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-white transition-colors inline-block p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/quote"
                                    className="hover:text-white transition-colors inline-block p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                >
                                    Get a Quote
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Vehicle Categories */}
                    <nav aria-label="Vehicle categories">
                        <h2 className="text-white text-lg font-semibold mb-4">Vehicle Categories</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/vehicles?category=sedan"
                                    className="hover:text-white transition-colors inline-block p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                >
                                    Sedans
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/vehicles?category=suv"
                                    className="hover:text-white transition-colors inline-block p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                >
                                    SUVs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/vehicles?category=luxury"
                                    className="hover:text-white transition-colors inline-block p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                >
                                    Luxury Cars
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/vehicles?category=electric"
                                    className="hover:text-white transition-colors inline-block p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                >
                                    Electric Vehicles
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <MapPin size={20} aria-hidden="true" />
                                <address className="not-italic">
                                    123 Car Street, Auto City, AC 12345
                                </address>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} aria-hidden="true" />
                                <Link
                                    href="tel:+1234567890"
                                    className="hover:text-white transition-colors p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                    aria-label="Call us at (123) 456-7890"
                                >
                                    (123) 456-7890
                                </Link>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} aria-hidden="true" />
                                <Link
                                    href="mailto:info@vehiclehub.com"
                                    className="hover:text-white transition-colors p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                                    aria-label="Email us at info@vehiclehub.com"
                                >
                                    info@vehiclehub.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm">
                            © {currentYear} VehicleHub. All rights reserved.
                        </p>
                        <nav
                            className="flex space-x-6 mt-4 md:mt-0"
                            aria-label="Legal links"
                        >
                            <Link
                                href="/privacy"
                                className="text-sm hover:text-white transition-colors p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm hover:text-white transition-colors p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/sitemap"
                                className="text-sm hover:text-white transition-colors p-1 focus:ring-2 focus:ring-white focus:outline-none rounded"
                            >
                                Sitemap
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}