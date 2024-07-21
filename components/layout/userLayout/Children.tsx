import { ReactNode } from 'react'
import styles from './Children.module.css'
type ChildTypeProp = {
    children: ReactNode
}

function Children({children}:ChildTypeProp) {
  return (
    <div className={styles.container}>
            {children}
    </div>
  )
}

export default Children