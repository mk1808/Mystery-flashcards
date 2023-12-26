import { AlertType } from "@/enums/AlertType";
import useAlertStore from "@/stores/useAlertStore";
import { XMarkIcon, XCircleIcon, InformationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AlertComponent({
    alert
}: {
    alert: Alert
}) {    
    const close = useAlertStore((state) => state.close)
    const [scale, setScale] = useState("scale-0")
    const [progress, setProgress] = useState(100)

    useEffect(() => {
        setTimeout(() => {
            setScale("scale-100");
        }, 100);
        const interval = setInterval(calcProgressToClose, 25)
        return () => { clearInterval(interval) }
    }, []);

    function calcProgressToClose() {
        setProgress(progress => {
            if (progress <= 0) {
                onClose();
            }
            return progress - 0.5
        });
    }

    function onClose() {
        setScale("scale-0");
        setTimeout(() => {
            close(alert);
        }, 150);
    }

    function getColor() {
        switch (alert.type) {
            case AlertType.error:
                return "bg-red-300 border-red-500";
            case AlertType.info:
                return "bg-sky-300 border-sky-500";
            case AlertType.success:
                return "bg-green-300 border-green-500";
            case AlertType.warning:
                return "bg-yellow-300 border-yellow-500";
        }
    }

    return (
        <div role="alert" className={`alert my-4 w-[400px] transition duration-150 ${scale} ${getColor()}`} key={alert.key}>
            {renderIcon()}
            <span>{alert.title}</span>
            {renderProgress()}
        </div>
    );

    function renderIcon() {
        switch (alert.type) {
            case AlertType.error:
                return <XCircleIcon className="h-6 w-6 text-black" />
            case AlertType.info:
                return <InformationCircleIcon className="h-6 w-6 text-black" />
            case AlertType.success:
                return <CheckCircleIcon className="h-6 w-6 text-black" />
            case AlertType.warning:
                return <ExclamationTriangleIcon className="h-6 w-6 text-black" />
        }
    }

    function renderProgress() {
        return (
            <div className="radial-progress" style={{ "--value": progress, "--size": "2rem", "--thickness": "3px" } as any} role="progressbar" onClick={onClose}>
                <XMarkIcon className="h-6 w-6 text-black cursor-pointer" />
            </div>
        );
    }
}