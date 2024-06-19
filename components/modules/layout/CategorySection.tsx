'use client'
import { useEffect, useState } from 'react';
import styles from './CategorySection.module.css'



function CategorySection() {
  const [categories , setCategories] = useState({})

  useEffect(()=>{
    const getCategories = async ()=>{
    const res = await fetch(`http://localhost:5000/category/list` , {credentials:'include' , method:"GET"})
    const {data} = await res.json()
    setCategories(data.categories)
    }
    getCategories()
  },[])

  return (
        <div className={styles.main}>

        </div>
  );
}

export default CategorySection;