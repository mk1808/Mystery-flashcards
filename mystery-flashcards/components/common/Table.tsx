import React from 'react'

function Table({ renderRows, columns }: { renderRows: () => any, columns: string[] }) {

    return (
        <div className="overflow-x-auto ">
            <table className="table min-w-[600px]">
                <thead>
                    <tr>
                        {columns.map(col => col && <th key={col} className='text-sm'>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

export default Table