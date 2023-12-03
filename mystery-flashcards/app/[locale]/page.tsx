import Sidebar from "@/components/Sidebar";
import { getDictionary } from "@/dictionaries/dictionaries"

export default async function Page({ params }: { params: { locale: string } }) {
    const dictionary = await getDictionary(params.locale);

    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
            <div className="h-96">
                first
            </div>
            <div className="h-96" id="search-sets">
                second
                <button className="btn">Button</button>
                <button className="btn btn-neutral">Neutral</button>
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-accent">Accent</button>
                <button className="btn btn-ghost">Ghost</button>
                <button className="btn btn-link">Link</button>
                <div style={{ width: 200, height: 200 }} className="bg-primary"></div>
            </div>
            <Sidebar></Sidebar>
        </div>
    )
}
//return <div>{dictionary.common.mainPage}</div>