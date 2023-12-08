"use client"
import RoundActionButton from '@/components/common/RoundActionButton'
import React from 'react'
import { ArrowLongDownIcon } from '@heroicons/react/24/solid'
import Steps from '@/components/common/Steps'
import Card from '@/components/Card'
import Modal from '@/components/common/Modal'

function Playground() {
    return (
        <div>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <div className="h-96">
                    first
                </div>
                <RoundActionButton content={getButtonContent()} styles="border-[3px]" />
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
            {renderStepsCard()}
            <div className='my-5'>
                {renderCard()}
            </div>

        </div>
    )

    function getButtonContent() {
        return <ArrowLongDownIcon className="h-11 w-11" />
    }

    function renderStepsCard() {
        return <Modal modalTrigger={<button className="btn">open modal</button>}
            dialogHeader={<h3 className="font-bold text-lg">Hello!</h3>}
            dialogActions={<button className="btn">Close</button>}
            dialogContent={<Steps steps={[{ title: 1 }, { title: 2 }, { title: 3 }]} />}
        />
    }

    function renderCard() {
        return (
<> <div className='w-3 h-3 bg-black'>abc</div>
            <div className="card w-[1000px] bg-base-100 shadow-xl mb-10">
                <div className="card-body">
                    <div className="flex justify-around">
                        <div className="w-full flex justify-end">
                          text  
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="w-full">
                          text  
                        </div>
                    </div>
                </div>
            </div>
</>
        )
    }
}

export default Playground