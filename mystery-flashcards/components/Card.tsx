import React from 'react'

function Card({ children, title, className = "w-[700px] h-[80vh]" }: { children: any, title: any, className?: string }) {
    return (
        <div className={"card bg-base-100 shadow-xl " + className}>
            <div className="card-body">
                {title}
                {children}
            </div>
        </div>
    )
}

export default Card