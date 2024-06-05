import styles from './BannerCard.module.css'

type BannerCardPropType = {
  text1 : string , 
  text2: string ,
  logosrc1:string , 
  logosrc2:string
}
function BannerCard({text1 , text2 , logosrc1 , logosrc2}:BannerCardPropType) {
 
  return (
    <div className={styles.container}>
             <div className={styles.card}>
                    <div className={styles.border}>
                     <img src={logosrc1}/> 
                    </div>
                    <p> {text1} </p>

            </div>
            <div className={styles.card}>
                    <img src={logosrc2}/>
                     <div className={styles.border}></div>
                    <p> {text2} </p>
            </div>
    </div> 
  )
}

export default BannerCard