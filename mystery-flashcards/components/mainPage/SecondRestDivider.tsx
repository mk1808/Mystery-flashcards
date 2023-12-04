"use client"
import PanelDivider from "../common/PanelDivider";
import { ArrowLongUpIcon, ArrowLongDownIcon } from "@heroicons/react/24/outline";

export default function SecondRestDivider() {
    const onUpClick = () => document.getElementById("secondPanel")?.scrollIntoView({ behavior: "smooth" });
    const onDownClick = () => document.getElementById("flashcardSetsSearch")?.scrollIntoView({ behavior: "smooth" });
    const onClick = (isUpperHalf: boolean) => isUpperHalf ? onUpClick() : onDownClick();

    function renderContent(isUpperHalf: boolean) {
        if (isUpperHalf) {
            return <ArrowLongUpIcon className="h-11 w-11" onClick={onUpClick} />
        }
        return <ArrowLongDownIcon className="h-11 w-11" onClick={onDownClick} />
    }

    return <PanelDivider onClick={onClick} renderContent={renderContent} />
}