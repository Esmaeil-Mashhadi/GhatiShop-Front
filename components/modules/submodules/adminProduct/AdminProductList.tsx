'use client'
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from 'react'
import styles from './AdminProductList.module.css'
import { IoIosSearch } from "react-icons/io";
import ProductContainer from './ProductContainer';
import NextAndPrevButton from './NextAndPrevButton';
import BulkOperation from './BulkOperation';


export type IncomingProductType ={
  title: string;
  shortDesc: string; 
  price: string;
  specialPrice: string;
  otherImages: string[] ;
  mainImage:string
  description: string;
  features: {name:"", description:""}[];
  categories:(string)[],
  _id:string 
}

function AdminProductList() {

  const [products , setProducts] = useState<IncomingProductType[]>([])
  const [searchInput , setSearchInput] = useState('')
  const [page , setPage] = useState(1)
  const [update , setUpdate] =useState(false)
  const[loading ,setLoading] = useState(true)
  const [totalPages , setTotalPages] = useState(loading ? "...":1)
  const [selectedProducts , setSelectedProducts] = useState<string[]>([])


  useEffect(()=>{
    const getListOfProduct = async()=>{
      const res = await fetch(`http://localhost:5000/product/list?page=${page}`)
      const result = await res.json() 
      const products = result.data.products || []
      setLoading(false)
      setProducts(products)
      setTotalPages(result.data.totalPages)
      console.log('regetting');
    }
    getListOfProduct()
  },[page , update])




  const onSearchChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const {value} = e.target 
    setSearchInput(value)
  }

  const searchHandler = async()=>{
    const res = await fetch(`http://localhost:5000/product/list/search?searchRegex=${searchInput.trim()}&&page=${page}`)
    const result = await res.json()
    setProducts(result.data.products)
    setTotalPages(result.data.totalPages)
  }
  const keyDownSearchHandler:KeyboardEventHandler<HTMLInputElement> = (e)=>{
    if(e.key =="Enter"){
      searchHandler()
    }
  }

  const handlebulkSelect =(e:any)=>{
    const allIds:any = []
    if(e.target.checked){
      products.forEach((product)=>{
        allIds.push( product._id)
      })
      setSelectedProducts(allIds)
    }else{
      setSelectedProducts([])
    }
  }


  return (
    <div className={styles.container}>    
      <div  className={styles.topSide}>
          <div className={styles.noBulkSection}>
 
          <div className={styles.search}>
              <label >جست و جوی محصول : </label>
              <input onKeyDown={keyDownSearchHandler} value={searchInput} onChange={onSearchChange} />
              <IoIosSearch onClick={searchHandler}/>
          </div>    
            <NextAndPrevButton page={page} setPage={setPage}  totalPages={totalPages}/>
         </div>

          <BulkOperation setUpdate={setUpdate} update={update} selectedProducts= {selectedProducts} handlebulkSelect={handlebulkSelect} />
      </div>

      {loading && <h1>در حال آماده سازی...</h1> }
      <ProductContainer selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} products={products}  />
      <NextAndPrevButton page={page} setPage={setPage}  totalPages={totalPages}/>

    </div>
  )
}

export default AdminProductList