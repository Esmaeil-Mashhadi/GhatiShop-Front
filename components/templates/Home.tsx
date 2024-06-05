import Banner from '../modules/home/BannerContainer'
import DiscountSection from '../modules/home/DiscountSection'
import PopulatrProducts from '../modules/home/PopularCategories'
import styles from './Home.module.css'
function Home() {
  return (
    <div className={styles.container}>
        <Banner />
        <h4>پیشنهادات شگفت انگیز ما</h4>
        <DiscountSection />
        <h4>  پرفروش ترین محصولات </h4>
        <PopulatrProducts />
    </div>
  )
}

export default Home 