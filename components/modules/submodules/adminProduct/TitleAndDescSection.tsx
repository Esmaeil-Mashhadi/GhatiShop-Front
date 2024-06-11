import styles from './Title.module.css'

function TitleAndDescSection() {
  return (
    <div className={styles.titleContainer}>
    <div className={styles.title}>
      <label> عنوان :  </label>
      <input type='text' />
    </div>

    <div className={styles.shortDesc}>
        <label>توضیح کوتاه محصول: </label>
        <textarea />
    </div>
</div>
  )
}

export default TitleAndDescSection