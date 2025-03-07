'use client'

import dynamic from 'next/dynamic';
import Loading from '@/components/loading';

const SearchBar = dynamic(
    () => import('./SearchBar').then(mod => ({ default: mod.SearchBar })),
    {
        ssr: false,
        loading: () => <Loading />
    }
);

export default function SearchBarWrapper() {
    return <SearchBar />;
} 