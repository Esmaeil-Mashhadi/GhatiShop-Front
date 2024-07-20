import { useEffect, useState } from 'react'
import styles from './FeatureBox.module.css'

function FeatureBox({features}:any) {

    const [randomFeatures ,setRandomFeatures] = useState<any[]>([])

    useEffect(()=>{
        const indexSet = new Set()

        while(indexSet.size < 4){
            indexSet.add(Math.round(Math.random() * (features.length - 1)))
        }
  
        const featureArray = Array.from(indexSet).map((index)=>{
           return typeof(index)=='number' ?  features[index] : []
        })
        setRandomFeatures(featureArray)
    },[])
      

  return (
    <div className={styles.featuresContainer}>
         <h3>برخی ویژگی ها</h3>
         <div className={styles.featureBoxContainer}>
         {randomFeatures?.map((item:any , index:number)=>(
             <div key={index} className={styles.featureBox}>
                 <label>{item.name}</label>
                 <p>{item.description}</p>
             </div>
         ))} 
        </div>
 </div>
  )
}

export default FeatureBox