"use client"
import { useRef } from "react";

function Modal({
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

    return (
        <>
            {renderTrigger()}
            {renderDialog()}
        </>
    )

    function renderTrigger() {
        return (
            <div onClick={onClick}>{modalTrigger}</div>
        )
    }

    function renderDialog() {
        return (
            <dialog ref={buttonRef} className="modal">
                <div className={`modal-box max-w-5xl sm:${width}`}>
                    {dialogHeader}
                    {renderDialogBody()}
                    {renderDialogActions()}
                </div>
            </dialog>
        )
    }

    function renderDialogBody() {
        return (
            <div className="max-h-[70vh] overflow-y-auto">{dialogContent}</div>
        )
    }

    function renderDialogActions() {
        return (
            <div className="modal-action">
                <form method="dialog">
                    {dialogActions}
                </form>
            </div>
        )
    }
}

export default Modal