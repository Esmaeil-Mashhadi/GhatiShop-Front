import Link from 'next/link'
import styles from './Checkout.module.css'

function Checkout({user}:any) {
  return (
    <>
    <div className={styles.container}>
        <div className={styles.checkoutSection}>
                
        </div>

        <div className={styles.formSection}>
            <label>آدرس</label>
            <input />
        </div>
    </div>
    {!user && 
        <div className={styles.modalContainer}>
            <div className={styles.questionBox}>
                <p>قبل از ادامه فرایند لطفا وارد بشید</p>
                <div className={styles.buttonContainer}>
                      <Link href='/signup?referer=checkout'>
                          ورود و ثبت نام
                      </Link>
                      <Link href={'/cart'}>
                          بازگشت
                      </Link>
                </div>
            </div>
        </div>
    }
    </>

  )
}

export default Checkout