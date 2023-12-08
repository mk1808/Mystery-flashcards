import React from 'react'

function MyTextarea({
    label,
    placeholder = "",
    className = ""
}: {
    label: string,
    placeholder?: string,
    className?: string
}) {
    return (
        <label className={`form-control ${className}`}>
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <textarea placeholder={placeholder} className="textarea textarea-bordered h-24"></textarea>
        </label>
    )
}

export default MyTextarea