'use client'
import { useEffect, useState } from 'react'
import styles from './ProfileBookmarks.module.css'
import ProductCard from '../shopList/ProductCard'
function ProfileBookmarks() {
  const [favorites , setFavorites] = useState([])
  useEffect(()=>{
    const getFavorties = async ()=>{
      const res = await fetch('http://localhost:5000/product/list')
      const {data} = await res.json()
      setFavorites(data.products)
    }
    getFavorties()
  },[])
  return (
    <div className={styles.container}>
      {favorites.map((item:any)=>(
            <ProductCard product={item} />
      ))}
    </div>
  )
}

export default ProfileBookmarks