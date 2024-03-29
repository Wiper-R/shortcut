import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function useDebounced(value: any, callback: () => void, delay = 500) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        clearTimeout(timeoutRef.current!);
        timeoutRef.current = setTimeout(callback, delay);
        return () => clearTimeout(timeoutRef.current!);
    }, [callback, delay, value]);
}