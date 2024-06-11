import styles from './PriceAndCategorySection.module.css'

function PriceAndCategory() {
  return (
    <div className={styles.titleContainer}>

    <div className={styles.title}>
      <label> قیمت به تومان :  </label>
      <input type='number' />
    </div>

    <div className={styles.title}>
      <label> قیمت ویژه  :  </label>
      <input type='number' />
    </div>
</div>
  )
}

export default PriceAndCategory