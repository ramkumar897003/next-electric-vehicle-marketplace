import { Suspense } from 'react';
import Loading from '@/components/loading';
import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('@/features/contact/Contact'), {
    ssr: true,
    loading: () => <Loading />
});

export default function ContactPage() {
    return (
        <Suspense fallback={<Loading />}>
            <Contact />
        </Suspense>
    );
} 