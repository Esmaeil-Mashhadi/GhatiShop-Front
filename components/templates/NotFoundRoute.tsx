'use client'
import { redirect, useRouter } from 'next/navigation'
import styles from './NotFound.module.css'

function NotFoundRoute() {
    const router = useRouter()
  return (
    <div className={styles.container}>
        <img className={styles.notfound}  src='/404.gif'/>
        <p className={styles.wrongText}>مسیرو اشتباهی اومدی </p>
    <div className={styles.buttons}>
        <button onClick={()=>router.push('/')}>رفتن به خانه</button>
    </div>
    </div>
  )
}

export default NotFoundRoute