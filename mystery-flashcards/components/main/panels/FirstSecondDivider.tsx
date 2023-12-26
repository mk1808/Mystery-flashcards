"use client"
import PanelDivider from "../../common/PanelDivider";
import { ArrowLongUpIcon, ArrowLongDownIcon } from "@heroicons/react/24/outline";

function FirstSecondDivider() {
    const onUpClick = () => scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const onDownClick = () => document.getElementById("secondPanel")?.scrollIntoView({ behavior: "smooth" });
    const onClick = (isUpperHalf: boolean) => isUpperHalf ? onUpClick() : onDownClick();

    return <PanelDivider onClick={onClick} renderContent={renderContent} />

    function renderContent(isUpperHalf: boolean) {
        if (isUpperHalf) {
            return <ArrowLongUpIcon className="h-11 w-11" />
        }
        return <ArrowLongDownIcon className="h-11 w-11" />
    }
}

export default FirstSecondDivider