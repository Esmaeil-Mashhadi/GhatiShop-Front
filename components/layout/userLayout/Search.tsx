'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import styles from './Search.module.css'
import { IoSearchSharp } from 'react-icons/io5'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Search() {
    const [searchInput , setSearchInput] = useState('')
    const [productResult , setProductResult]= useState([])
    const router = useRouter()
    const changeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target
        setSearchInput(value)
    }

    useEffect(()=>{
        const controller = new AbortController()

        window.addEventListener('click', (e:MouseEvent)=>{
             const target = e.target as HTMLElement
            if(!target.closest(`.${styles.container}`)){
                setProductResult([])
            }
        })

        window.addEventListener('keypress' ,(e:KeyboardEvent)=>{
            if(e.key =='Enter'){
                router.push(`/shopList?search=${searchInput}`)
            }
        })
        const fetchUsre = async()=>{
           const res = await fetch(`http://localhost:5000/product/list?search=${searchInput}`, {
            method:"GET",
            signal:controller.signal
          })
           const result = await res.json()
           setProductResult(result.data.products)
        }
        if(searchInput.trim().length){
            fetchUsre()
        }else{
            setProductResult([])
        }

        return ()=>{
            controller.abort()
        }
    },[searchInput])


  return (
    <div className={styles.container}>
        <div className={styles.searchContainer}>
            <Link href={`/shopList?search=${searchInput}`} ><IoSearchSharp/></Link>
            <input value={searchInput} onChange={changeHandler} type='text' placeholder='  دنبال چیزی می گردی ؟'/>
        </div>

        <div className={styles.searchResult}>
        {!!productResult.length && 
            <ul>
                    <Link className={styles.userTyped} href={`/shopList?search=${searchInput}`}>
                    <p>مشاهده ی نتایج برای  : </p>
                    <span>{searchInput}</span>
                    </Link>
                
            {productResult.map((item:any)=>(
                    <Link href={`/shopList?search=${item.title}`}>{item?.title}</Link>
            ))}
            </ul>}
        </div>
    </div>
  )
}

export default Search