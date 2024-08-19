import styles from './TextArea.module.css'

export function TextArea({title}:any) {

  return (
    <div className={styles.txtContainer}>
        <label>{title} : </label>
        <textarea placeholder={title == 'یادداشت' ? 'اگر یادداشتی برای سفارش خود دارید برای ما بنویسید' : ""} />
    </div>
  )
}

export function InputForm({title}:any){
  return (
    <div className={styles.inputContainer}>
        <div>
            <label>{title =='name' ? 'نام' : 'کد پستی'} : </label>
            <input />
        </div>
         <div>
            <label>{title =='name' ? 'نام خانوادگی' : 'پلاک'}  : </label>
            <input />
        </div>
    </div>

  )
}
