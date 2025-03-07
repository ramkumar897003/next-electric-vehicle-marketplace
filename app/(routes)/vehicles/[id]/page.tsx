import React from 'react'
import VehicleDetailWrapper from '@/features/vehicles/VehicleDetailWrapper'

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function VehicleDetailPage(props: PageProps) {
    const params = await props.params;
    const id = await Promise.resolve(params.id);
    return <VehicleDetailWrapper id={id} />;
}