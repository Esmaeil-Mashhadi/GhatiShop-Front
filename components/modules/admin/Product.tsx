import styles from './Product.module.css'
import Link from 'next/link'
import {  useSearchParams } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import CreateProduct from '../submodules/adminProduct/CreateProduct'
import AdminProductList from '../submodules/adminProduct/AdminProductList'




function AdminProducts() {
      const params = useSearchParams()
      const selectStyle:Record<string , string> ={
          '--transfer':  params.get('createProduct') ? '0%' :"-100%"
      }

  return (
    <div  className={styles.container} >
       <div style={selectStyle} className={styles.titleContainer}>
             <Link href={{pathname:'/admin/products' , query:{createProduct: true}}}>ایجاد محصول</Link> 
            <Link href={{pathname:'/admin/products' , query:{productList: true}}}>لیست محصولات</Link>
       </div>

       {params.get('createProduct') ? 
                  <CreateProduct /> : <AdminProductList />
      }
          <Toaster />
    </div>
  )
}

export default AdminProducts