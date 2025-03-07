'use client'

import { Providers } from '@/app/providers';
import VehicleDetail from './VehicleDetail';

export default function VehicleDetailWrapper({ id }: { id: string }) {
    return (
        <Providers>
            <VehicleDetail id={id} />
        </Providers>
    );
} 