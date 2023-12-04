"use client"

import DividerButton from "./DividerButton";
import { useEffect, useRef, useState } from "react";
import useDocumentScroll from "@/hooks/useDocumentScroll";

export default function PanelDivider({
    renderContent,
    onClick,
}: {
    renderContent: (isUpperHalf: boolean) => any
    onClick: (isUpperHalf: boolean) => any,
}) {

    const documentOffset = useDocumentScroll();
    const [windowHeight, setWindowHeight] = useState(-1);
    const containerElement = useRef<HTMLDivElement>(null);
    const buttonHalfSize = 40;

    useEffect(() => {
        setWindowHeight(window.innerHeight);
    }, [])

    const displayAboveLine = () => getOffset() <= 0;
    const displayFixedBottom = () => getOffset() > 0 && getOffset() < buttonHalfSize;
    const displayFixedTop = () => getOffset() > 0 && getOffset() > windowHeight - buttonHalfSize && getOffset() < windowHeight + 30;
    const displayBelowLine = () => getOffset() > 0 && getOffset() > windowHeight + 30;
    const displayUpperHalf = () => getOffset() > 0 && getOffset() > windowHeight / 2;

    function getOffset() {
        return documentOffset + windowHeight - (containerElement.current?.offsetTop || 0)
    }

    function getButtonStyles() {
        if (displayAboveLine()) {
            return "absolute top-[-100px]"
        } else if (displayFixedBottom()) {
            return "fixed bottom-[20px]"
        } else if (displayFixedTop()) {
            return "fixed top-[20px]"
        } else if (displayBelowLine()) {
            return "absolute top-[40px]";
        }
        return "absolute top-[-40px]";
    }

    function getContainerStyles() {
        if (displayFixedBottom() || displayFixedTop()) {
            return ""
        }
        return "relative";
    }


    return (
        <div className="w-full" ref={containerElement}>
            {renderDivider()}
        </div>
    )

    function renderDivider() {
        if (documentOffset < 0 || windowHeight <= 0) {
            return <></>
        }

        return <DividerButton buttonStyle={getButtonStyles()} containerStyle={getContainerStyles()} content={renderContent(displayUpperHalf())} onClick={() => onClick(displayUpperHalf())} />
    }


}