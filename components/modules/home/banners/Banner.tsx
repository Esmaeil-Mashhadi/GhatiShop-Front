import { NeutralButton } from '@/components/constants/buttons/Button'
import styles from './Banner.module.css'

import BannerCard from '../BannerCard'

export type BannerPropType ={
  title:string , 
  bannerText1:string , 
  bannerText2:string , 
  imgsrc : string
  buttonText:string
  logosrc1:string ,
  logosrc2:string
}

function Banner({title , bannerText1 , bannerText2 , imgsrc , buttonText , logosrc1 , logosrc2}:BannerPropType) {
  return (
  <div className={styles.container}>
    <div className={styles.rightSide}>
        <div className={styles.topSide}>
             <p className={styles.title}>{title}</p>
             <NeutralButton text={buttonText} handler={()=>{}}/>
        </div>
        <div className={styles.downSide}>
            <BannerCard text1={bannerText1} logosrc1 ={logosrc1} logosrc2 ={logosrc2} text2={bannerText2}/>
        </div>
    </div>

     <div className={styles.leftSide}>
        <img src={imgsrc} />
     </div>
</div>

  )
}

export default Banner