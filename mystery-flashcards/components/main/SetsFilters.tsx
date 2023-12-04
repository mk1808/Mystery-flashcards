import React from 'react'
import SetCard from './SetCard'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Title from '../common/Title';

function SetsFilters({ dictionary }: { dictionary: any  }) {
    return (
        <div>
            {renderFilters()}
            {renderResults()}
        </div>
    )

    function renderFilters() {
        return (
            <div >
                <div className="my-6">
                    <Title text={dictionary.common.whatLanguage}></Title>
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
                                <button className="btn btn-primary">{dictionary.common.search}
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

export default SetsFilters