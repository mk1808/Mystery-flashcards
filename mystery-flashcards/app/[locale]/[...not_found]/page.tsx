import useLocaleStore from "@/stores/useLocaleStore";


async function NotFound() {
    const { dictionary } = useLocaleStore(state => state);
    return <div>{dictionary.common.notFound}</div>
}

export default NotFound