import styles from '@/components/mainPage/styles.module.scss'

export default function FirstPanel() {

    return (
        <div className={styles.firstPanel}>
            <div className={styles.leftSide}><img src='/images/diagram.svg' /></div>
            <div className={styles.rightSide}></div>
        </div>
    )
}