"use client"
import useLocaleStore from "@/stores/useLocaleStore";

function NotFound() {
    const { dictionary } = useLocaleStore(state => state);
    return <div>{dictionary.common.notFound}</div>
}

export default NotFound