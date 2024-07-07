import { Dispatch, SetStateAction } from 'react'
import styles from './NextAndPrevButton.module.css'

type nextAndPrevPropType = {
    page : number 
    totalPages:number | string
    setPage :Dispatch<SetStateAction<number>>
}

function NextAndPrevButton({page , setPage , totalPages}:nextAndPrevPropType) {
    const pageHandler =(drc:'next'|'prev')=>{
        if(drc == 'next'){  
         if(page == totalPages) return
         setPage(page + 1)
        }else if(drc =='prev'){
         if(page == 1) return
         setPage(page - 1)
        }
     }
  return (
    <div className={styles.nextandPrevButtons}>
    <button
        title='صفحه ی قبل' 
        style={{opacity:page == 1?'.5':'1'}} 
        disabled={page == 1} id='end'
        onClick={()=>pageHandler('prev')}>
        {"<"}
    </button>

    <p>{`${page}`}</p> 

    <button
        title='صفحه ی بعد' 
        style={{opacity:page ==totalPages ? '.5':'1'}}
        disabled={totalPages ==page}
        onClick={()=>pageHandler('next')}>
      {">"}
    </button>

    <span> {` ${page} از ${totalPages}`}</span>
 </div>
  )
}

export default NextAndPrevButton