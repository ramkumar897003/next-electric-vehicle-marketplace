import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/loading';

const Quote = dynamic(() => import('@/features/quote/Quote'), {
    ssr: true,
    loading: () => <Loading />
});
export default function QuotePage() {
    return (
        <Suspense fallback={<Loading />}>
            <Quote />
        </Suspense>
    );
} 