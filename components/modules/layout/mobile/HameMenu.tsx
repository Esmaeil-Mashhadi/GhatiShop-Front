'use client'

import Link from 'next/link'
import styles from './HameMenu.module.css'
import { IoSearchSharp } from "react-icons/io5";
import { useState } from 'react';
import MobileCategorySection from './MobileCategorySection';
import HamMenuButton from '@/components/constants/buttons/HamMenuButton';

type hameMenuPropType ={
    user?:string |undefined ,
}

function HameMenu({user}:hameMenuPropType) {
    type stateType = {
        category?: boolean;
        menu?: boolean;
    };

    const [showMenu, setShowMenu] = useState(false);
    const [userChoice, setUserChoice] = useState<stateType>({
        category: false,
        menu: true
    });



    const transformMenu: Record<string, string | undefined> = {
        '--transform': showMenu ? 'translateX(0%)' : 'translateX(110%)',
        '--pointerEvent': showMenu?  "all" : 'none',
        '--opacity' : showMenu ? '1' : '0'
    };

    const selectMenuStyle: Record<string, string | undefined> = {
        '--left': userChoice.category ? '0' : '50%',
    };



    return (
        <>
        {showMenu && 
          <div onClick={()=>setShowMenu(false)} className={styles.modalBG}>
         </div>}
             <HamMenuButton setShowMenu={setShowMenu} showMenu={showMenu}  />
            <div style={transformMenu} className={styles.container}>
                <div className={styles.searchContainer}>
                    <button><IoSearchSharp /></button>
                    <input type='text' placeholder='  دنبال چیزی می گردی ؟' />
                </div>
                <div style={selectMenuStyle} className={styles.dropDownContainer}>
                    <button onClick={() => setUserChoice({ menu: true })}>منو</button>
                    <button onClick={() => setUserChoice({ category: true })}>دسته بندی ها</button>
                </div>

                {userChoice.menu ?
                    <div className={styles.menu}>
                        {user ?
                            <Link href="">
                                حساب کاربری
                            </Link> :
                            <Link href="">
                                ورود
                            </Link>
                        }
                        <Link href="">
                            فروشگاه
                        </Link>
                        <Link href="">
                            تخفیفات شگفت انگیز
                        </Link>
                        <Link href="">
                            محصولات جدید
                        </Link>
                        <Link href="">
                            درباره ی ما
                        </Link>
                   
                    </div> :
                            <MobileCategorySection />
                        }

                <div className={styles.categories}>
                </div>
            </div>
       </>
    );
}

export default HameMenu;