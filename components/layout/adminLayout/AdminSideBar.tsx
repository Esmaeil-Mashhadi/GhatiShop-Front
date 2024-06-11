import Link from 'next/link'
import styles from './AdminSideBar.module.css'
import { RxExit } from "react-icons/rx";


function AdminSideBar({slug}:{slug:string}) {
    const sideBarList = [
        { label: 'داشبورد', url: 'dashboard' },
        { label: 'محصولات', url: 'products' },
        { label: 'سفارش ها', url: 'orders' },
        { label: 'دسته بندی ها', url: 'categories' },
        { label: 'کاربران', url: 'users' },
        { label: 'کامنت ها', url: 'comments' },
    ]
    const basePath = '/admin'

    const selectStyle = {
        background : 'lightblue',
        color:'black'
    }
    
  return (
    <div className={styles.container}>
        {sideBarList.map((item ,index)=>(
            <Link style={item.url == slug ? selectStyle:undefined} href={`${basePath}/${item.url}`} className={styles.list} key={index}>
                {item.label} 
            </Link>
        ))}
        <Link className={styles.shop} href={'/'}>
            فروشگاه <RxExit />
        </Link>
    </div>
  )
}

export default AdminSideBar