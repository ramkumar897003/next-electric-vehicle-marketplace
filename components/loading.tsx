export default function Loading() {
    return (
        <div
            className="flex items-center justify-center min-h-screen"
            role="status"
            aria-label="Loading content"
        >
            <div
                className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
        </div>
    );
} 