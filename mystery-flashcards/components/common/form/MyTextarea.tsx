import { errorTextareaClass } from '@/utils/client/FormUtils'
import React from 'react'

function MyTextarea({
    label,
    placeholder = "",
    className = "",
    inputParams,
    isValid = true
}: {
    label: string,
    placeholder?: string,
    className?: string,
    inputParams: any,
    isValid?: boolean
}) {
    return (
        <label className={`form-control ${className}`}>
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <textarea
                placeholder={placeholder}
                className={`textarea textarea-bordered h-24 ${errorTextareaClass(isValid)}`}
                {...inputParams} />
        </label>
    )
}

export default MyTextarea