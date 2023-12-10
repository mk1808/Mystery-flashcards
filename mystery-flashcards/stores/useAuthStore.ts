import { UserT } from "@/models/User";
import { getWhoAmi } from "@/utils/client/ApiUtils";
import { create } from "zustand";

type State = {
    currentUser: UserT | null
}

type Action = {
    set: (currentUser: UserT | null) => void,
    checkWhoAmi: () => void,
    clear: () => void
}

const checkWhoAmi = () => getWhoAmi().then(useAuthStore.getState().set).catch(() => useAuthStore.getState().set(null))

const useAuthStore = create<State & Action>((set) => ({
    currentUser: null,
    set: (currentUser: UserT | null) => set(() => ({ currentUser: currentUser })),
    checkWhoAmi: checkWhoAmi,
    clear: () => set(() => ({ currentUser: null }))
}))

export default useAuthStore;