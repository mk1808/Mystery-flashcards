import React from 'react'

function Table({ renderRows, columns }: { renderRows: any, columns: any }) {
    return (

        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col: any) => <th key={col}>{col}</th>)}
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