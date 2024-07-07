import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './BulkOperation.module.css'
import toast from 'react-hot-toast'
import TitleAndDescSection from './TitleAndDescSection'
import { CgCloseR } from "react-icons/cg";
import CategoryInput from './CategoryInput';
import { CategoriesObject } from '../../layout/CategorySection';


type BulkOperationtype ={
  handlebulkSelect : Dispatch<SetStateAction<any>>
  selectedProducts:string[]
  update:boolean 
  setUpdate : Dispatch<SetStateAction<boolean>>
}

interface EditType {
  category?:boolean | 'completed' , 
  discount?:boolean | 'completed', 
  price?:boolean | 'completed'
}
function BulkOperation({handlebulkSelect , selectedProducts , update , setUpdate}:BulkOperationtype) {

  const [edit , setEdit] = useState<EditType>({
    category: false , 
    discount:false , 
    price:false
  })

  const [categories , setCategories] =useState<CategoriesObject[]>([])
  const [newCategories , setNewCategoies] = useState<string[]>([])
  const countClick = useRef(0)

  const updateHandler = async (url:string , successMessage:string  , discountAmount?:string|number , updatePercent?:string |number )=>{
    let body 
    countClick.current > 2 ? countClick.current = 0 : null 
    switch (url) {
      case 'remove':
        body = JSON.stringify(selectedProducts) 
        break
      case 'category':
        countClick.current ++ //due to async behavior i put 1 for completed as the second click happens
        setEdit({price:false , discount:false ,category:countClick.current == 1 ? 'completed' :countClick.current == 0 ? true : false })
        body = JSON.stringify({selectedProducts , newCategories})
        break;
      case 'discount':
        body = JSON.stringify({selectedProducts , discountAmount})
        break
      case "price": 
        countClick.current ++
        setEdit({category:false , discount:false , price:countClick.current ==1 ?"completed":countClick.current ==0? true : false})
        body = JSON.stringify({selectedProducts , updatePercent})
        break
      default:
        break;
    }

    const {category , discount , price}  =edit

    if(category =='completed' || price =='completed' || discount =='completed'){
      const res = await fetch(`http://localhost:5000/productBulk/${url}`, {
        method:'PATCH' , credentials:'include' , 
        body ,
        headers:{'Content-Type' :'application/json'}
      })
      const result = await res.json()
      if(result.status == 200){
        toast.success(successMessage)
        setEdit({category:false , price:false , discount:false})
        setUpdate(!update)
        countClick.current =0
        
      }else{
        countClick.current =0
        setEdit({category:false , price:false , discount:false})
        toast.error('متاسفانه نتوانستیم درخواست شمارا اجرا کنیم')
      }
    }

  }

  useEffect(()=>{
   const getAllCategories = async()=>{
   const res=  await fetch('http://localhost:5000/category/list')
   const result = await res.json()
   setCategories(result.data.categories['layer0'])

   }
   getAllCategories()
  },[])
 
  const buttonArrayData = [
    {name:'حذف' , url:"remove" , successMessage:"محصولات با موفقیت حذف شدند"},
    {name:edit.category ? 'ثبت دسته بندی جدید' :"ویرایش دسته بندی", url:'category' , successMessage:"دسته بندی ها با موفقیت تغییر یافت"},
    {name:edit.discount?'ثبت تخفیف':'اعمال تخفیف' , url:'discount', successMessage:"تخفیف به روی محصولات اعمال شد"},
    {name:edit.price?"ثبت قیمت جدید":'ویرایش قیمت' , url:'price' , successMessage:"قیمت ها با موفقیت ویرایش یافت"}
  ]

  const ifMultiple = selectedProducts.length > 1

  const changeCatInputHandler =(e:ChangeEvent<HTMLInputElement>)=>{
    const {checked , value} = e.target 
     if(checked){
      setNewCategoies([...newCategories , value])
     }else{
        const updateSelectedCats = newCategories.filter(item => item != value)
        setNewCategoies(updateSelectedCats)
     }
  }


  return (
    <div className={styles.container}>

      <div className={styles.chooseContainer}>
        <label>عملیات دسته جمعی : </label>
        <div className={styles.bulkContainer}>
           <div className={styles.selectContainer}>
                   <label htmlFor={`checkWhole`} className={styles.checkProduct}>
                    <p >انتخاب دسته جمعی</p>
                    <input onChange={handlebulkSelect} name='blukSelect' type='checkBox' id={`checkWhole`} />       
                 </label>
           </div>  

           <div className={styles.bulkButtons}>
              {buttonArrayData.map((btn , index)=>(
                <button key={index} 
                disabled ={!ifMultiple } 
                style={!ifMultiple? {opacity:.5}: undefined} 
                 onClick={()=>updateHandler(btn.url , btn.successMessage, )}>{btn.name}</button>
              ))}
           </div>
         </div>
      </div>
 <div className={styles.editSection}>
     <div style={edit.category ? {scale:1,  height:'300px'} : {scale:0 , height:'0px'}} className={styles.editCat} >
             <label>دسته بندی جدید را انتخاب کنید</label> 
             <CategoryInput catList={categories} newCategories={newCategories} changeInputHandler={changeCatInputHandler} />
             <CgCloseR onClick={()=>{
                setEdit({category:false})
                countClick.current = 0
                }} />
     </div>
     <div style={edit.price ? {scale:1 , height:'100px'}: {scale:0 , height:'0px'}} className={styles.editPrice} >
             <label>درصد قیمت جدید را وارد کنید :</label> 
             <input type='number' />
             <CgCloseR onClick={()=>{
                setEdit({category:false})
                countClick.current = 0
                }} />
     </div>
     {/* <div className={styles.setDiscount} >
             <label>دسته بندی جدید را انتخاب کنید</label> 
     </div> */}

 </div>
 </div>

  )
}

export default BulkOperation