"use client"
import { useRef } from "react";

export default function Modal({
    modalTrigger,
    dialogHeader,
    dialogContent,
    dialogActions,
    width = "w-10/12",
    disabled = false
}: {
    modalTrigger: any,
    dialogHeader: any,
    dialogContent: any,
    dialogActions: any,
    width?: string,
    disabled?: boolean
}) {
    const buttonRef = useRef<any>(null);
    const onClick = (event: any) => disabled ? "" : buttonRef.current?.showModal();

    return (<>
        <div onClick={onClick}>{modalTrigger}</div>
        <dialog ref={buttonRef} className="modal">
            <div className={`modal-box max-w-5xl ${width}`}>
                {dialogHeader}
                <div className="max-h-[70vh] overflow-y-auto">{dialogContent}</div>
                <div className="modal-action">
                    <form method="dialog">
                        {dialogActions}
                    </form>
                </div>
            </div>
        </dialog>
    </>
    )
}