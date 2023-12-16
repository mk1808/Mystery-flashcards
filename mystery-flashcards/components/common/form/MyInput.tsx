import { errorClass } from '@/utils/client/FormUtils'
import React from 'react'

function MyInput({
    label,
    placeholder = "",
    className = "",
    inputParams,
    type = "text",
    isValid = true
}: {
    label: string,
    placeholder?: string,
    className?: string,
    inputParams: any,
    type?: string,
    isValid?: boolean
}) {

    return (
        <label className={`form-control w-full mb-3 ${className}`}>
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input type={type} placeholder={placeholder} className={`input input-bordered w-full ${errorClass(isValid)}`} {...inputParams} />
        </label>
    )
}

export default MyInput