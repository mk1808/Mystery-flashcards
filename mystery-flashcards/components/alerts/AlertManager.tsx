"use client"
import useAlertStore from "@/stores/useAlertStore"
import AlertComponent from "./AlertComponent"

function AlertManager() {
    const { alerts } = useAlertStore((state) => state)

    return (
        <div className="fixed top-24 right-4">
            {alerts.map(renderAlert)}
        </div>
    )

    function renderAlert(alert: Alert) {
        return <AlertComponent alert={alert} key={alert.key} />
    }
}

export default AlertManager