"use client"
import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/20/solid";
import DividerButton from "../common/DividerButton";
import useDocumentScroll from "@/hooks/useDocumentScroll";
import { useRef, useEffect, useState } from "react";


export default function FirstSecondDivider() {
    const documentOffset = useDocumentScroll();
    const [windowHeight, setWindowHeight] = useState(-1);
    const buttonHalfSize = 40;

    useEffect(() => {
        setWindowHeight(window.innerHeight);
    }, [])

    const breakpoint1 = () => documentOffset < buttonHalfSize;
    const breakpoint2 = () => documentOffset > windowHeight - buttonHalfSize && documentOffset < windowHeight + 30;
    const breakpoint3 = () => documentOffset > windowHeight + 30;

    const onUpClick = () => scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const onDownClick = () => document.getElementById("secondPanel")?.scrollIntoView({ behavior: "smooth" });

    function getButtonStyles() {
        if (breakpoint1()) {
            return "fixed bottom-[20px]"
        } else if (breakpoint2()) {
            return "fixed top-[20px]"
        } else if (breakpoint3()) {
            return "absolute top-[40px]";
        }
        return "absolute top-[-40px]";
    }

    function getContainerStyles() {
        if (breakpoint1() || breakpoint2()) {
            return ""
        }
        return "relative";
    }

    if (documentOffset < 0 || windowHeight <= 0) {
        return <></>
    }

    return <DividerButton buttonStyle={getButtonStyles()} containerStyle={getContainerStyles()} content={renderContent()} />

    function renderContent() {
        const renderArrowUp = windowHeight / 2 < documentOffset;
        if (renderArrowUp) {
            return <ArrowLongUpIcon className="h-11 w-11" onClick={onUpClick} />
        }
        return <ArrowLongDownIcon className="h-11 w-11" onClick={onDownClick} />
    }
}