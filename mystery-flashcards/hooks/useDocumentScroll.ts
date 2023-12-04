import { useEffect, useState } from "react";

export default function useDocumentScroll() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setOffset(window?.scrollY)
        const onScroll = () => setOffset(window?.scrollY);
        window?.removeEventListener('scroll', onScroll);
        window?.addEventListener('scroll', onScroll, { passive: true });
        return () => window?.removeEventListener('scroll', onScroll);
    }, []);

    return offset;
}