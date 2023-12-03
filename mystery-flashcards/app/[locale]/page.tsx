import Sidebar from "@/components/Sidebar";
import RoundActionButton from "@/components/common/RoundActionButton";
import Title from "@/components/common/Title";
import SetCard from "@/components/main/SetCard";
import { getDictionary } from "@/dictionaries/dictionaries"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowLongDownIcon } from '@heroicons/react/24/solid'

export default async function Page({ params }: { params: { locale: string } }) {
    const dictionary = await getDictionary(params.locale);

    return (
        <>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <div className="h-96">
                    first
                </div>
                <RoundActionButton content={getButtonContent()} borderWidth="border-[3px]" />
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
            </div>
            {renderFilters()}
            {renderResults()}
        </>
    )

    function getButtonContent() {
        return <ArrowLongDownIcon className="h-11 w-11" />
    }

    function renderFilters() {
        return (
            <div >
                <div className="my-6">
                    <Title text="Jaki język Cię interesuje?"></Title>
                </div>

                <div className="card w-[1100px] bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex justify-between">
                            {renderInput()}
                            {renderSelect()}
                            {renderSelect()}
                        </div>
                        <div className="flex justify-between">
                            {renderSelect()}
                            {renderSelect()}
                            <div className="w-[320px] flex justify-center items-end">
                                <button className="btn btn-primary">Buy Now
                                    <MagnifyingGlassIcon className="h-6 w-6" /></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function renderSelect() {
        return (
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pick the best fantasy franchise</span>
                </div>
                <select className="select select-bordered">
                    <option disabled selected>Pick one</option>
                    <option>Star Wars</option>
                    <option>Harry Potter</option>
                    <option>Lord of the Rings</option>
                    <option>Planet of the Apes</option>
                    <option>Star Trek</option>
                </select>
            </label>
        )
    }


    function renderInput() {
        return (
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">What is your name?</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
        )
    }

    function renderResults() {
        return (
            <div className="mt-12 my-10 w-[1100px]">
                <div className="flex justify-between">
                    <SetCard></SetCard>
                    <SetCard></SetCard>
                    <SetCard></SetCard>
                </div>
                <div className="flex justify-between mt-12">
                    <SetCard></SetCard>
                    <SetCard></SetCard>
                    <SetCard></SetCard>
                </div>
            </div>
        )
    }

    
}
//return <div>{dictionary.common.mainPage}</div>