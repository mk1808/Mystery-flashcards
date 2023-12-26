import { UserT } from "@/models/User";
import { getWhoAmi } from "@/utils/client/ApiUtils";
import { create } from "zustand";

type State = {
    currentUser: UserT | null,
    shouldCheckWhoIam: boolean
}

type Action = {
    set: (currentUser: UserT | null) => void,
    checkWhoAmi: () => void,
    clear: () => void,
    setShouldCheckWhoIam: (shouldCheckWhoIam: boolean) => void
}

const checkWhoAmi = () => getWhoAmi().then(useAuthStore.getState().set).catch(() => useAuthStore.getState().set(null))

const useAuthStore = create<State & Action>((set) => ({
    currentUser: null,
    shouldCheckWhoIam: true,
    set: (currentUser: UserT | null) => set((state) => ({ currentUser: currentUser, shouldCheckWhoIam: !!currentUser || state.shouldCheckWhoIam })),
    checkWhoAmi: checkWhoAmi,
    clear: () => set(() => ({ currentUser: null, shouldCheckWhoIam: true })),
    setShouldCheckWhoIam: (shouldCheckWhoIam) => set(() => ({ shouldCheckWhoIam }))
}))

export default useAuthStore;