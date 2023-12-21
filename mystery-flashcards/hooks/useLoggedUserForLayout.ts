import useAuthStore from '@/stores/useAuthStore';
import { logout } from '@/utils/client/ApiUtils';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function useLoggedUserForLayout({ renderMenuElement, locale }: { renderMenuElement: any, locale: string }) {

    const currentUser = useAuthStore(state => state.currentUser);
    const checkWhoAmi = useAuthStore(state => state.checkWhoAmi);
    const router = useRouter();

    function renderMenuElementIfNeeded(element: any) {
        const isLogged = !!currentUser;
        if (element.forAll ||
            isLogged && element.forLogged ||
            !isLogged && element.forNotLogged)
            return renderMenuElement(element);
    }

    function onLogout() {
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