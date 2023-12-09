"use client"
import { useRef } from "react";

export default function Modal({
    modalTrigger,
    dialogHeader,
    dialogContent,
    dialogActions
}: {
    modalTrigger: any,
    dialogHeader: any,
    dialogContent: any,
    dialogActions: any
}) {
    const buttonRef = useRef<any>(null);

    return (<>
        <div onClick={() => buttonRef.current?.showModal()}>{modalTrigger}</div>
        <dialog ref={buttonRef} className="modal">
            <div className="modal-box w-10/12 max-w-5xl">
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