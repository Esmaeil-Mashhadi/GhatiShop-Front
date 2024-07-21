import Link from 'next/link'
import styles from './Footer.module.css'
import { FaTelegram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsTelephoneFill } from "react-icons/bs";



function Footer() {
  return (
    <div className={styles.container}>
       <div className={styles.rightSide}>
           <h4>درباره ی قاطی شاپ</h4>
           <p> 
              قاطی شاپ، فروشگاه اینترنتی پیشرو در ایران، خریدی آسان، به صرفه و مطمئن را برای شما به ارمغان می آورد. 
              ما با ارائه‌ی طیف گسترده ای از محصولات باکیفیت و خدمات پس از فروش کامل، همراه شما هستیم.
           </p>
       </div>

       <div className={styles.leftSide}> 
            <h4>ارتباط با ما</h4>
            <div className={styles.icons}>
                    <Link href=""><RiInstagramFill/></Link>
                    <Link href=""><FaTelegram/></Link>
                    <Link href=""><BsTelephoneFill/></Link>
            </div>
            <p>ساعات تماس در روزهای غیر تعطیل از ساعت   9:00 - 19:00</p>
            
       </div>

    </div>
  )
}

export default Footer