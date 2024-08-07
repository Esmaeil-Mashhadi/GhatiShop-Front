import { useEffect, useState } from 'react'
import styles from './FeatureBox.module.css'
import { MagnifyingGlass } from 'react-loader-spinner'

type FeaturesType = {name:string , description:string }
interface FeatureBoxPropType {
    features : FeaturesType[]
}
function FeatureBox({features}:FeatureBoxPropType) {

    const [randomFeatures ,setRandomFeatures] = useState<FeaturesType[]>([])
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        const indexSet:Set<number> = new Set()

        while(indexSet.size < 4){
            indexSet.add(Math.round(Math.random() * (features.length - 1)))
        }
  
            const featureArray = Array.from(indexSet).map((itemIndex:number)=>{
               return features[itemIndex] 
            })
             setRandomFeatures(featureArray)
             setLoading(false)
    },[])
      

  return (
    <div className={styles.featuresContainer}>
         <h3>برخی ویژگی ها</h3>
         <div className={styles.featureBoxContainer}>
        {loading && <MagnifyingGlass width={60} height={60} glassColor='rgba(192, 195, 251, 0.13) ' color='rgb(192, 195, 251)' />}
         {randomFeatures?.map((item:FeaturesType , index:number)=>(
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