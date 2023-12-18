import { errorClass } from '@/utils/client/FormUtils'
import React from 'react'

function MyRadioInputButton({
    label = "",
    option1Label = "",
    option2Label = "",
    value1 = "",
    value2 = "",
    className = "",
    inputParams,
    isValid = true,
    size = ""
}: {
    label?: string,
    option1Label: string,
    option2Label: string,
    value1: string,
    value2: string,
    className?: string,
    inputParams: any,
    isValid?: boolean,
    size: string
}) {

    return (
        <label className={`form-control w-full mb-3  ${className}`}>
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <div className="join">
                <input
                    className={`join-item btn ${size} ${errorClass(isValid)}`}
                    type="radio"
                    name="options"
                    value={value1}
                    aria-label={option1Label}
                    {...inputParams} />
                <input
                    className={`join-item btn ${size} ${errorClass(isValid)}`}
                    type="radio"
                    name="options"
                    value={value2}
                    aria-label={option2Label}
                    {...inputParams} />
            </div>
        </label>
    )
}

export default MyRadioInputButton
/*
       <input type={type} placeholder={placeholder} className={`input input-bordered w-full ${errorClass(isValid)}`} {...inputParams} />
     
<input className="join-item btn" type="radio" name="options" aria-label="Radio 1" />
*/

