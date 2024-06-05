import Link from 'next/link'
import styles from './PopularCategories.module.css'

function PopulatrProducts() {
  return (
    <div className={styles.container}>
            {[...Array(4)].map((item , index)=>{
                return <Link href="" key={index}>
                    <img src='./homepage/perfume.jpg' />
                </Link>
            })}
    </div>
  )
}

export default PopulatrProducts