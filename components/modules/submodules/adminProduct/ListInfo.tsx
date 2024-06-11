import { useState } from 'react';
import styles from './ListInfo.module.css'
import { FaTrashArrowUp } from "react-icons/fa6";

function ListInfo() {
    type KeysType = string[];
    const [keys , setKeys] = useState<KeysType>([])
    const addHandler = ()=>{
        if(keys.length == 10){
            return
        }
        setKeys([...keys , ''])
    }

    const removeHandler = (index: number) => {
      const newKeys = keys.filter((_, i) => i !== index);
      setKeys(newKeys);
    };

  return (
    <div className={styles.container}>
     <button style={keys.length == 10 ? {cursor:"not-allowed"}:undefined} onClick={addHandler} className={styles.addMore}> {keys.length < 10 ? "+ اضافه کردن مشخصات": 'حداکثر ده مشخصات می توان وارد کرد'}</button>    
     {keys.map((item, index)=> (
      <div className={styles.listContainer} key={index}>
            <input placeholder={item ? item : 'اسم مشخصات'} />
            <input placeholder='توضیحات مربوطه' />
            <button onClick={()=>removeHandler(index)} className={styles.trashButton}><FaTrashArrowUp /></button>
        </div>
     ))}     
    </div>
  )
}

export default ListInfo