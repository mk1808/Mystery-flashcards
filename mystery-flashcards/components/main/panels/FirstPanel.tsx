import styles from '@/components/main/panels/styles.module.scss'

export default function FirstPanel() {

    return (
        <div className={`flex flex-col xl:flex-row w-full ${styles.firstPanel}`} id='firstPanel'>
            <div className={`bg-[url('/images/gr7.png')] bg-contain bg-center bg-no-repeat h-full w-full xl:w-[45%] float-left`} />
            <div className={`bg-[url('/images/books14.jpg')] bg-contain bg-center bg-no-repeat h-full w-full xl:w-[55%] float-right ${styles.rightSide}`} />
        </div>
    )
}