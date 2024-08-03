import styles from './PopularCategories.module.css'
import {motion, Variants} from 'framer-motion'

function AddVertismentProducts() {
  
  const imgLeftVar:Variants = {
    offscreen:{
      x:200 ,
      opacity:0
    },
    onscreen:{
      opacity:1,
      x:0,
      transition:{
        duration:.7,
        delay : .2,
        type:'spring'
      }
    }
  }
  const imgRightVar:Variants={
    offscreen:{
      x:-200 ,
      opacity:0
    },
    onscreen:{
      opacity:1,
      x:0,
      transition:{
        duration:.7,
        type:'spring'

      }
    }
  }
  type imagesType ={
    img:string , 
    desc:string 
  }

  const images:imagesType[] = [
    {img:'/homepage/advBanner/sm.jpg' , desc:'توضیحات درباره تبلیغات عکس مورد نظر '},
    {img:'/homepage/advBanner/sw.jpg' , desc:'توضیحات درباره تبلیغات عکس مورد نظر '},
    {img:'/homepage/advBanner/gl.webp' , desc:'توضیحات درباره تبلیغات عکس مورد نظر '},
    {img:'/homepage/advBanner/pc.jpg' , desc:'توضیحات درباره تبلیغات عکس مورد نظر '},
  ]
  return (
    <motion.div 
    className={styles.container}
    >
      {images.map((imgData , index:number)=>(
        <div key={index} className={styles.imageContainer}>
          <motion.img 
          src={imgData.img} 
          viewport={{once:true}}
           variants={index%2 == 0 ? imgLeftVar : imgRightVar}
           initial='offscreen'
           whileInView='onscreen'
          />
          <div className={styles.miniModal}>
            <p>{imgData.desc}</p>
            <button>مشاهده و خرید </button>
          </div>
        </div>
      ))}

    </motion.div>
  )
}

export default AddVertismentProducts