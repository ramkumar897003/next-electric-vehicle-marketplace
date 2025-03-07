import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

function RoutesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20 pb-12">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default RoutesLayout;