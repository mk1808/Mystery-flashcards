"use client"
import useAlertStore from "@/stores/useAlertStore"
import AlertComponent from "./AlertComponent"

function AlertManager() {
    const alerts = useAlertStore((state) => state.alerts)

    return (
        <div className="fixed top-24  right-4">
            {alerts.map(alert => <AlertComponent alert={alert} key={alert.key} />)}
        </div>
    )
}

export default AlertManager