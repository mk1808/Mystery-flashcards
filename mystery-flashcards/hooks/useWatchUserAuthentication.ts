import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function useWatchUserAuthentication(locale: string) {
    const currentUser = useAuthStore(state => state.currentUser);
    const userRef = useRef<any>();
    const router = useRouter();

    useEffect(() => {
        if (userRef.current && !currentUser) {
            router.push(`/${locale}/loggedOut`);
        }
        userRef.current = currentUser;
    }, [currentUser])
}