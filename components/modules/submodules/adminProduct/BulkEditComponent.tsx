import styles from './BulkEditComponent.module.css'
import { BiSolidTrash } from "react-icons/bi";
import CategoryInput from './CategoryInput';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosWarning } from "react-icons/io";


interface BulkEditComponentPropType {
    selectedProducts : string[] ,
    updated: boolean , 
    setUpdated: Dispatch<SetStateAction<boolean>>
    setSelectedProducts: Dispatch<SetStateAction<string[]>>
}

function BulkEditComponent({selectedProducts , updated , setSelectedProducts, setUpdated}:BulkEditComponentPropType) {

    const [newCategories , setNewCategories] = useState<string[]>([])
    const [newPrice , setNewPrice] = useState<string | number>()
    const [discount , setDiscount] = useState<string| number>()
    const [catList , setCatList] = useState([])
    const [showModal , setShowModal] = useState(false)


    useEffect(()=>{
        const getListOfCategories = async()=>{
            const res = await fetch('http://localhost:5000/category/list', {
                method:"GET" , credentials:'include'
            })
            const result = await res.json()
            setCatList(result.data.categories['layer0'])
        }

        getListOfCategories()
    },[])

    const changeInputHandler= (e:ChangeEvent<HTMLInputElement>)=>{
        const {value ,checked} = e.target 
        if(checked){
            setNewCategories([...newCategories , value])
        }else{
            const updatedNewCats = newCategories.filter(item => item != value)
            setNewCategories(updatedNewCats)
        }
    }

    const submitUpdateHandler = async(urlReq:string)=>{
        let body 
        switch (urlReq) {
            case 'category':
                    body = {selectedProducts , newCategories}
                    break   
            case 'remove': 
                    body = {selectedProducts}  
                    setShowModal(false)
                    setSelectedProducts([])
                    break  
            case 'price':
                body = {selectedProducts , newPrice} 
                break
            case 'discount':
                body = {selectedProducts , discount}
                break
            default:
                break;
        }
            const res = await fetch(`http://localhost:5000/productBulk/${urlReq}`, {
                method:"PATCH" , credentials:'include' , body:JSON.stringify(body) ,  
                headers:{"Content-Type" : "application/json"}
            })

            const result = await res.json()
            if(result.status == 200){
                toast.success(result.data.message?? 'بروز رسانی با موفقیت انجام شد')
                setUpdated(!updated)
                
            }else{
                toast.error(result.data.message )
            }
    }


    const showWarning = ()=>{
        setShowModal(true)
    }

    const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value , name} = e.target 
        if(name =='price'){
            setNewPrice(value)
        }else if(name=="discount"){
            setDiscount(value)
        }
    }

    
  return (
    <div className={styles.container}>

        <div className={styles.editPart}>

                <button onClick={showWarning} className={styles.delete}>
                             حذف محصولات  
                         <BiSolidTrash />
                </button>
                <div className={styles.editPrice}>
                        <label>بروز رسانی قیمت :</label>
                        <input name='price' value={newPrice} onChange={changeHandler} placeholder='درصد وارد کنید' type='number' />
                        <button onClick={()=>submitUpdateHandler('price')}> بروز رسانی قیمت </button>
                </div>
                <div className={styles.setDiscount}>
                        <label>اعمال تخفیف:</label>
                        <input name='discount' value={discount} onChange={changeHandler} type='number' placeholder='درصد وارد کنید' />
                        <button onClick={()=>submitUpdateHandler('discount')}> اعمال تخفیف</button>

                </div>
        </div>

        <div className={styles.categoryPart}>
            <CategoryInput newCategories={newCategories} changeInputHandler={changeInputHandler}  catList={catList} />
            <button onClick={()=>submitUpdateHandler('category')}>ثبت دسته بندی جدید</button>
        </div>

        <div style={showModal? {opacity: 1 , pointerEvents:'all'}: {opacity :0 , pointerEvents:'none'}} className={styles.warningModal}>
                <div className={styles.warningContainer}>
                        <p>
                            {`تعداد ${selectedProducts.length} محصول حذف شود؟ `}
                            <IoIosWarning />
                        </p>
                        <div style={{display:'flex' , alignItems:'center' , gap:'10px'}}>
                            <button onClick={()=>submitUpdateHandler('remove')}>حذف محصولات</button>
                            <button onClick={()=>setShowModal(false)}> بازگشت</button>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default BulkEditComponent