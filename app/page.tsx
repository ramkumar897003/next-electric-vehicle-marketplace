import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
      role="main"
      aria-label="Homepage"
    >
      {/* Hero Section */}
      <section
        className="container mx-auto px-4 pt-20 pb-16"
        aria-labelledby="hero-heading"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Find Your Perfect
              <span className="text-blue-600"> Electric Vehicle</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Discover a wide range of electric vehicles. From luxury sedans to practical SUVs,
              find the perfect EV that matches your lifestyle.
            </p>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg 
                text-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              aria-label="Browse our vehicle collection"
            >
              Browse Vehicles
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative w-full max-w-2xl">
            <div className="aspect-[16/9] relative">
              <Image
                src="/hero-car.webp"
                alt="Featured electric vehicle"
                fill
                priority
                loading="eager"
                className="object-cover rounded-2xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                quality={90}
              />
            </div>
            {/* Stats Overlay */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white p-6 rounded-xl shadow-lg 
                flex gap-8 w-max"
              role="list"
              aria-label="Key statistics"
            >
              <div className="text-center" role="listitem">
                <p
                  className="text-2xl font-bold text-blue-600"
                  aria-label="Over 100 vehicles available"
                >
                  100+
                </p>
                <p className="text-sm text-gray-600">Vehicles</p>
              </div>
              <div className="text-center" role="listitem">
                <p
                  className="text-2xl font-bold text-blue-600"
                  aria-label="Over 50 authorized dealers"
                >
                  50+
                </p>
                <p className="text-sm text-gray-600">Dealers</p>
              </div>
              <div className="text-center" role="listitem">
                <p
                  className="text-2xl font-bold text-blue-600"
                  aria-label="24/7 customer support available"
                >
                  24/7
                </p>
                <p className="text-sm text-gray-600">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="container mx-auto px-4 py-16"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">Our Features</h2>
        <div
          className="grid md:grid-cols-3 gap-8"
          role="list"
          aria-label="Key features"
        >
          <div
            className="bg-white p-6 rounded-xl shadow-sm"
            role="listitem"
          >
            <h3 className="text-xl font-semibold mb-3">Wide Selection</h3>
            <p className="text-gray-600">Browse through our extensive collection of electric vehicles.</p>
          </div>
          <div
            className="bg-white p-6 rounded-xl shadow-sm"
            role="listitem"
          >
            <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
            <p className="text-gray-600">Get guidance from our team of EV specialists.</p>
          </div>
          <div
            className="bg-white p-6 rounded-xl shadow-sm"
            role="listitem"
          >
            <h3 className="text-xl font-semibold mb-3">Easy Process</h3>
            <p className="text-gray-600">Simple and straightforward buying experience.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
