'use client'

import dynamic from 'next/dynamic';
import Loading from '@/components/loading';

const VehicleFilters = dynamic(
    () => import('./Filters').then(mod => ({ default: mod.default })),
    {
        ssr: false,
        loading: () => <Loading />
    }
);

export default function FiltersWrapper() {
    return <VehicleFilters />;
} 