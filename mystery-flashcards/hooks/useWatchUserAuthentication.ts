import useAuthStore from "@/stores/useAuthStore";
import useLocaleStore from "@/stores/useLocaleStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function useWatchUserAuthentication() {
    const { locale } = useLocaleStore(state => state);
    const { currentUser, shouldCheckWhoIam } = useAuthStore(state => state);
    const userRef = useRef<any>();
    const router = useRouter();

    useEffect(() => {
        if (shouldCheckWhoIam && userRef.current && !currentUser) {
            router.push(`/${locale}/loggedOut`);
        }
        userRef.current = currentUser;
    }, [currentUser, shouldCheckWhoIam])
}

export default useWatchUserAuthentication;