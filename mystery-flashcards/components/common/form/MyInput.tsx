import React from 'react'

function MyInput({
    label,
    placeholder = "",
    className = ""
}: {
    label: string,
    placeholder?: string,
    className?: string
}) {
    return (
        <label className={`form-control w-full ${className}`}>
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input type="text" placeholder={placeholder} className="input input-bordered w-full" />
        </label>
    )
}

export default MyInput