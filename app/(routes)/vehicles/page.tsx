import { Suspense } from 'react';
import Loading from '@/components/loading';
import VehicleListingWrapper from '@/features/vehicles/VehicleListingWrapper';

export default function VehiclesPage() {
    return (
        <Suspense fallback={<Loading />}>
            <VehicleListingWrapper />
        </Suspense>
    );
}