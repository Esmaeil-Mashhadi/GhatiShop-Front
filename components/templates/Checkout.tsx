'use client'
import Link from 'next/link'
import styles from './Checkout.module.css'
import { commaSeperator } from '@/utils/converters/commaSeperator'
import { SubmitButton } from '../constants/buttons/Button'
import StatesForm from '../modules/submodules/Cart/checkout/StatesForm'
import { InputForm, TextArea } from '../modules/submodules/Cart/checkout/TextArea'

function Checkout({user}:any) {
    const {totalPrice}  = JSON.parse(localStorage.getItem('orders')??"{}")
  return (
    <>
    <div className={styles.container}>
        <div className={styles.formSection}>
            <h2>صورت حساب</h2>
            <div className={styles.infoSection}>
                        <InputForm title ='name' />
                        <StatesForm />
                        <InputForm title="postal" />
                        <TextArea title='آدرس کامل' />
                        <TextArea title="یادداشت" />
           
            </div>

        </div>
        <div className={styles.checkoutSection}>
                <h2>جزییات سفارش</h2>
                <p>مبلغ سفارش : <span>{commaSeperator(totalPrice)} تومان </span></p>
                <p>هزینه ارسال : <span>{commaSeperator(49000)} تومان</span></p>
                <p className={styles.finalPrice}>مبلغ نهایی : <span>{commaSeperator(totalPrice + 49000)} تومان</span></p>
                <SubmitButton text='پرداخت' handler={()=>{}} />
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