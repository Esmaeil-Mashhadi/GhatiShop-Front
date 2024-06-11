import styles from './ImageSection.module.css'

function ImageSection() {
  return (
    <div className={styles.image}>

    <div>
        <label>تصویر اصلی: </label>
        <img className={styles.mainImage} src='/products/noImage.png' />
    </div>

    <div>
        <label>دیگر تصاویر:</label>
        {[...Array(3)].map((img , index) =>(
          <img key={index} src='/products/noImage.png' />
          ))}
    </div>
  </div>
  )
}

export default ImageSection