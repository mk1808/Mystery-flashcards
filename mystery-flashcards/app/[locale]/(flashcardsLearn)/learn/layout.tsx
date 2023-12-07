import Card from '@/components/Card'
import AuthTitle from '@/components/auth/AuthTitle'
import Title from '@/components/common/Title'
import React from 'react'

function LearnLayout({ children }: { children: any }) {
    return (
        <div className='grid items-start'>
            <Card title={<Title text={"Nauka"}></Title>} className='h-[60vh] w-[1000px] mb-8'>
                {children}
            </Card>
            <div className='grid justify-center'>
                <button className="btn btn-primary mb-3 btn-wide">Zatwierdź odpowiedź</button>
                <button className="btn btn-secondary mb-3 btn-wide">Zakończ naukę</button>
            </div >

        </div>
    )
}

export default LearnLayout