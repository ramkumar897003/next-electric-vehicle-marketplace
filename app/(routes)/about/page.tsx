import { Suspense } from 'react';
import Loading from '@/components/loading';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/features/about/About'), {
    ssr: true,
    loading: () => <Loading />
});

export default function AboutPage() {
    return (
        <Suspense fallback={<Loading />}>
            <About />
        </Suspense>
    );
} 