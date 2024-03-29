import { useEffect, useRef } from "react";

export function useIntersectionObserver<T extends HTMLElement>(
    callback: () => void,
    options: IntersectionObserverInit = {}
): React.MutableRefObject<T | null> {
    const observed = useRef<T | null>(null);

    useEffect(() => {
        if (!observed.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                callback();
            }
        }, options);

        observer.observe(observed.current);

        return () => observer.disconnect();
    }, [callback, options]);

    return observed;
}