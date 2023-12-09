import { excludeFromArray } from "@/utils/server/arrayUtils";
import { create } from "zustand";

type State = {
    alerts: Alert[]
}

type Action = {
    add: (alert: Alert) => void,
    close: (alert: Alert) => void
}

const randomKey = () => Math.floor(Math.random() * 1000_000);

const useAlertStore = create<State & Action>((set) => ({
    alerts: [],
    add: (alert: Alert) => set((state) => ({ alerts: [...state.alerts, { ...alert, key: alert.key || randomKey() }] })),
    close: (alert: Alert) => set((state) => ({ alerts: [...excludeFromArray(state.alerts, alert)] }))
}))

export default useAlertStore;