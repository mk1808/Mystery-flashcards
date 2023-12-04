import React from 'react'

function Card({ children, title }: { children: any, title:any }) {
    return (
        <div className="card w-[700px] h-[80vh] bg-base-100 shadow-xl">
            <div className="card-body">
                {title}
                {children}
            </div>
        </div>
    )
}

export default Card