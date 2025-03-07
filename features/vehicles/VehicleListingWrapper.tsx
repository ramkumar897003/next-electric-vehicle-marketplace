'use client'

import dynamic from 'next/dynamic';
import Loading from '@/components/loading';

const VehicleListing = dynamic(
    () => import('./VehicleListing'),
    {
        ssr: false,
        loading: () => <Loading />
    }
);

export default function VehicleListingWrapper() {
    return <VehicleListing />;
} 