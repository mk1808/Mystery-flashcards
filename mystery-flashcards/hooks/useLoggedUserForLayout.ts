import useAuthStore from '@/stores/useAuthStore';
import useLocaleStore from '@/stores/useLocaleStore';
import { logout } from '@/utils/client/ApiUtils';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function useLoggedUserForLayout({ renderMenuElement }: { renderMenuElement: any }) {
    const { locale } = useLocaleStore(state => state);

    const { currentUser } = useAuthStore(state => state);
    const { checkWhoAmi, setShouldCheckWhoIam } = useAuthStore(state => state);
    const router = useRouter();

    function renderMenuElementIfNeeded(element: any) {
        const isLogged = !!currentUser;
        if (element.forAll ||
            isLogged && element.forLogged ||
            !isLogged && element.forNotLogged)
            return renderMenuElement(element);
    }

    function onLogout() {
        setShouldCheckWhoIam(false)
        logout().then(checkWhoAmi)
        router.push(`/${locale}`)
    }

    useEffect(() => {
        checkWhoAmi();
        const interval = setInterval(checkWhoAmi, 60 * 1000);
        return () => clearInterval(interval);
    }, [])
    return { renderMenuElementIfNeeded, onLogout }
}

export default useLoggedUserForLayout