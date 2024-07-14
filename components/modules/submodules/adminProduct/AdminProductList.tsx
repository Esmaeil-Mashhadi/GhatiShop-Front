'use client'
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from 'react'
import styles from './AdminProductList.module.css'
import { IoIosSearch } from "react-icons/io";
import ProductContainer from './ProductContainer';
import NextAndPrevButton from './NextAndPrevButton';
import BulkOperation from './BulkOperation';
import BulkEditComponent from './BulkEditComponent';
import { Toaster } from 'react-hot-toast';


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
  const [bulkEdit , setBulkEdit] = useState(false)
  const[loading ,setLoading] = useState(true)
  const [totalPages , setTotalPages] = useState(loading ? "...":1)
  const [selectedProducts , setSelectedProducts] = useState<string[]>([])
  const [updated , setUpdated] = useState(false)


  useEffect(()=>{
    const getListOfProduct = async()=>{
      const res = await fetch(`http://localhost:5000/product/list?page=${page}`)
      const result = await res.json() 
      const products = result.data.products || []
      setLoading(false)
      setProducts(products)
      setTotalPages(result.data.totalPages)
    }
    getListOfProduct()
    if(selectedProducts.length <= 1){
      setBulkEdit(false)
    }
  },[page , updated , selectedProducts ])





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

            {!!products.length && <NextAndPrevButton page={page} setPage={setPage}  totalPages={totalPages}/>}
         </div>
          <BulkOperation  selectedProducts ={selectedProducts} bulkEdit ={bulkEdit} setBulkEdit={setBulkEdit}  handlebulkSelect={handlebulkSelect} />
      </div>

      {loading && <h1>در حال آماده سازی...</h1>}

      <div className={styles.bulkEditContainer} style={bulkEdit ? {height:'300px' , opacity:1}: {height:0 , opacity:0 , pointerEvents:'none'}}>
       
        <BulkEditComponent setSelectedProducts ={setSelectedProducts} updated ={updated} setUpdated = {setUpdated} selectedProducts={selectedProducts} />
        <button onClick={()=>setBulkEdit(false)} className={styles.closeBulkEdit}>
             X
        </button>
      </div>
      <ProductContainer updated={updated} setUpdated ={setUpdated} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} products={products}  />
      {products.length == 0 ? <p>محصولی یافت نشد</p>:
      <NextAndPrevButton page={page} setPage={setPage}  totalPages={totalPages}/>}
      <Toaster/>
    </div>
  )
}

export default AdminProductList