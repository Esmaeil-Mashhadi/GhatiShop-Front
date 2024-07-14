import { useEffect, useState } from 'react'
import styles from './MobileCategorySection.module.css'
import { CategoriesObject } from '../CategorySection'
import Link from 'next/link'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";




function ShowChildren({clicked  , catList , ShowChildrenHandler}:any) {

  return (
    <div  className={styles.children}>
            {catList?.map((child:any)=>(
                <div className={styles.chlidLinkContainer}>
                        <Link href={{}} >
                                {child.name} 
                                {child.children.length> 0 && 
                                 <button  className={clicked[child.slug] ? styles.opened : styles.unOpen}  onClick={()=>ShowChildrenHandler(child.slug)}>
                                       {clicked[child.slug]? <MdKeyboardArrowDown /> :<MdKeyboardArrowUp/>} 
                                 </button> 
                                }
                        </Link>
                        <div  className={clicked[child.slug] ? styles.showCats : styles.hideCats}>
                                     <ShowChildren  clicked ={clicked} catList ={child.children} /> 
                                
                        </div>
                </div>
            ))}
    </div>
  )
}





function MobileCategorySection() {
    const [categoriesList , setCategoriesList] = useState<any>()
    const [clicked , setClicked] = useState<Record<string , boolean>>({})

    useEffect(()=>{
        const getListOfCategories = async()=>{
            const res = await fetch('http://localhost:5000/category/list', {
                method:"GET" , 
            })
            const result = await res.json()
            setCategoriesList(result.data.categories)
        }
        getListOfCategories()
    },[])
    const ShowChildrenHandler = (catSlug:string)=>{
        setClicked({
            ...clicked , [catSlug] : !clicked[catSlug]
        })
    }

  return (
    <div className={styles.container}>
        {categoriesList && 
          <div className={styles.subContainer}>
                {categoriesList['layer0'].map((cats:CategoriesObject)=>(
                <div className={styles.linkContainer}>
                        <Link href={{}} >
                                {cats.name}
                                 <button className={clicked[cats.slug] ? styles.opened : styles.unOpen} onClick={()=>ShowChildrenHandler(cats.slug)}>
                                       {clicked[cats.slug] ? <MdKeyboardArrowDown /> :<MdKeyboardArrowUp />} 
                                 </button>
                        </Link>
                        <div  className={clicked[cats.slug] ? styles.showCats : styles.hideCats}>
                           <ShowChildren 
                             ShowChildrenHandler ={ShowChildrenHandler}
                             catList = {cats.children} 
                             clicked ={clicked} />

                        </div>

                </div>
                 ))}
          </div>
        }
  
    </div>
  )
}

export default MobileCategorySection