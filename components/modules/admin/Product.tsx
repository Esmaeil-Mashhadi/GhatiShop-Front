import ImageSection from '../submodules/adminProduct/ImageSection'
import ListInfo from '../submodules/adminProduct/ListInfo'
import PriceAndCategory from '../submodules/adminProduct/PriceAndCategorySection'
import TitleAndDescSection from '../submodules/adminProduct/TitleAndDescSection'
import styles from './Product.module.css'

function AdminProducts() {
  return (
    <div className={styles.container} >
          <div className={styles.topSide}>
                <div className={styles.infoSection}>
                      <TitleAndDescSection />
                      <PriceAndCategory />
                      <ImageSection />
                      <ListInfo />
                </div>
                
          </div>

          <div className={styles.longDesc}>
          </div>
    </div>
  )
}

export default AdminProducts