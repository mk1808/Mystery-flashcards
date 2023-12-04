import styles from '@/components/main/panels/styles.module.scss'

export default function FirstPanel() {

    return (
        <div className={styles.firstPanel} id='firstPanel'>
            <div className={styles.leftSide}><img src='/images/diagram.svg' /></div>
            <div className={styles.rightSide}></div>
        </div>
    )
}