import Title from '@/components/common/Title'
import React from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function FlashcardSetsFilters({ dictionary }: { dictionary: any }) {
    return (
        <div>
            <div className="my-6">
                <Title text={dictionary.common.whatLanguage} />
            </div>

            <div className="card w-[1100px] bg-base-100 shadow-xl">
                {renderCardBody()}
            </div>
        </div>
    )

    function renderCardBody() {
        return (
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
                        <button className="btn btn-primary">{dictionary.common.search}
                            <MagnifyingGlassIcon className="h-6 w-6" />
                        </button>
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
}

export default FlashcardSetsFilters