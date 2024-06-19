'use server'

import Link from 'next/link';
import styles from './Header.module.css';
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import HameMenu from '../modules/layout/HameMenu';
import { cookies } from 'next/headers';
import { checkUserAccessiblity } from '@/utils/authentication/checkUserAccessiblity';
import CategorySection from '../modules/layout/CategorySection';

async function Header() {
     const user = await checkUserAccessiblity(cookies().get('accessToken'))
      
  return (
    <div className={styles.container}>
      <div className={styles.rightSide}>
        <Link href="">
          صفحه ی اصلی
        </Link>
        <Link href="">
          فروشگاه
        </Link>
        <Link href="">
          تخفیفات شگفت انگیز
        </Link>
        <Link href="">
          درباره ی ما
        </Link>
        <div className={styles.categories}>

          <div className={styles.cateButton}> دسته بندی ها <MdOutlineKeyboardDoubleArrowUp /></div>
          <div className={styles.categoriesSection}>
              <CategorySection />
          </div>
        </div>
        
      </div>
      <div className={styles.hameMenu}>
           <HameMenu user ={user} />
      </div>

      <div className={styles.center}>
        {/* Center content */}
      </div>

      <div className={styles.leftSide}>
        <div className={styles.searchContainer}>
          <button><IoSearchSharp/></button>
          <input type='text' placeholder='  دنبال چیزی می گردی ؟'/>
        </div>

        {user ? (
          <Link href="/">
            حساب کاربری
          </Link>
        ) : (
          <Link href="/signup">
            ورود به حساب کاربری
          </Link>
        )}

        <img src='/header/GhatiLogo.png' alt='Logo' />
      </div>
    </div>
  );
}

export default Header;

