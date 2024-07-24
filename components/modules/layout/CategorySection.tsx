import Link from 'next/link';
import styles from './CategorySection.module.css'
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";


export interface CategoriesObject  {
    _id:  string,
    name: string,
    slug: string,
    layer: number,
    parentSlug: string,
    parent:string,
    children: [CategoriesObject],
    id: string
}

function ShowChildren({children}:{children : CategoriesObject[]}){
  return (
    <ul className={styles.children}>
    {children?.map((item:CategoriesObject , index:number)=>(
      <li key={index} >
        <Link href={{}}>
             {item.name}
        </Link>
        {item.children.length ? 
        <ShowChildren children={item.children} />: null}
      </li>
    ))}
      
    </ul>
  )
}


async function CategorySection() {

    const res = await fetch(`http://localhost:5000/category/list` , {credentials:'include' , method:"GET" })
    const {data} = await res.json()
    const categories:CategoriesObject[][] = Object.values(data.categories)
    
  return (
          <div className={styles.categoryContainer}>
              
              {categories[0]?.map((main:CategoriesObject ,index:number)=>(
                      <div key={index} className={styles.listContainer}>
                        <Link className={styles.mainLink} href={{}}>
                          {main.name} <MdOutlineKeyboardDoubleArrowUp/>
                        </Link>
                        <div className={styles.childrenContainer}>
                           {<ShowChildren children={main.children}   />}
                        </div>
                      </div>
                ))}
          </div>
  );
}

export default CategorySection;

