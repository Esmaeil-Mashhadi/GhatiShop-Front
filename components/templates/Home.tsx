'use client'
import Banner from '../modules/home/BannerContainer'
import DiscountSection from '../modules/home/DiscountSection'
import Latest from '../modules/home/Latest'
import AddVertismentProducts from '../modules/home/PopularCategories'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
        <Banner />
        <h4>پیشنهادات شگفت انگیز ما</h4>
        <DiscountSection/>
        <h4> دسته بندی های محبوب</h4>
        <AddVertismentProducts  />
        <h4>جدیدترین محصولات</h4>
        <Latest />
    </div>
  )
}

export default Home 