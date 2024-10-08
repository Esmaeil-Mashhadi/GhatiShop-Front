'use server'

import Link from 'next/link';
import styles from './Header.module.css';
import HameMenu from '../../modules/layout/mobile/HameMenu';
import { cookies } from 'next/headers';
import { checkUserAccessiblity } from '@/utils/authentication/checkUserAccessiblity';
import CategorySection from '../../modules/layout/CategorySection';
import Search from './Search';
import HeaderCart from '@/components/modules/submodules/Cart/HeaderCart';


async function Header() {
     const user = await checkUserAccessiblity(cookies().get('accessToken'))

  return (
  <div className={styles.outerLayer}>
    <div className={styles.container}>
      <div className={styles.rightSide}>
        <div className={styles.linkContaienr}>
            <Link href="/">
              صفحه ی اصلی
            </Link>
            <Link href="/shopList">
              فروشگاه
            </Link>
            <Link href="">
              تخفیفات شگفت انگیز
            </Link>
            <Link href="">
              درباره ی ما
            </Link>

        </div>

      </div>
      <div className={styles.hameMenu}>
           <HameMenu user={user}/>
      </div>

      <div className={styles.center}>
        <div className={styles.logo}>
        </div>
        <CategorySection />
      </div>

      <div className={styles.leftSide}>
        
      <Search />

      {/* <HeaderCart /> */}

      <div className={styles.account}>

        {user ? (
          <Link href="/profile/info">
            حساب کاربری
          </Link>
        ) : (
          <Link href="/signup">
            ورود به حساب کاربری
          </Link>
        )}

      </div>


      </div>
    </div>
  </div>

  );
}

export default Header;

