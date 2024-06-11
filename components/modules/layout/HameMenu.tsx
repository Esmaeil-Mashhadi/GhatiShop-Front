'use client'

import Link from 'next/link'
import styles from './HameMenu.module.css'
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState, MouseEvent } from 'react';

type hameMenuPropType ={
    user:string |undefined
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

    const hameStyle: Record<string, string | undefined> = {
        '--transformFirst': showMenu ? 'rotate(45deg)' : undefined,
        '--transformLast': showMenu ? 'rotate(-45deg)' : undefined,
        '--transformCenter': showMenu ? 'translateX(50%)' : 'translateX(0)',
        '--centerOpacity': showMenu ? '0' : '1'
    };

    const transformMenu: Record<string, string | undefined> = {
        '--transform': showMenu ? 'translateX(0%)' : 'translateX(110%)'
    };

    const selectMenuStyle: Record<string, string | undefined> = {
        '--left': userChoice.category ? '0' : '50%',
    };

    useEffect(() => {

        window.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          if (!target.closest(`.${styles.wholeHamContainer}`)) {
              setShowMenu(false);
          }
      });

    }, []);

    return (
        <div className={styles.wholeHamContainer}>
            <div onClick={() => setShowMenu(!showMenu)} style={hameStyle} className={styles.hameLines}>
                <span></span>
                <span></span>
                <span></span>
            </div>
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
                    <div className={styles.categories}>
                        <div className={styles.categoriesSection}>
                        </div>
                    </div>
                }

                <div className={styles.categories}>
                </div>
            </div>
        </div>
    );
}

export default HameMenu;