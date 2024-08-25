'use client'
import { useQuery } from '@tanstack/react-query'
import styles from './StatesForm.module.css'
import { Dispatch, SetStateAction, useState } from 'react'
import DropDown from '@/components/constants/other/DropDown';
import { ThreeDots } from 'react-loader-spinner';

type StateFormPropType={
 setEditing?:Dispatch<SetStateAction<boolean>>
}

function StatesForm({setEditing}:StateFormPropType) {

  const [state , setState] = useState('تهران')


    const fetchStates = async()=>{
        const stateRes = await fetch('https://iran-locations-api.ir/api/v1/fa/states')
        const stateResult = await stateRes.json() 
        return stateResult
    }
    const fetchCities = async ()=>{
        setCity('')
        const cityRes = await fetch(`https://iran-locations-api.ir/api/v1/fa/cities?state=${state}`)
        const [cityResult] = await cityRes.json()
        return cityResult.cities
    }
    const {data:cityData , isLoading } = useQuery({queryKey:['city' , state] , queryFn:fetchCities})
    const {data:stateData} = useQuery({queryKey:['state'] , queryFn:fetchStates}) 
  
  const [city , setCity] = useState('') 


  return (
    <div className={styles.container}>
           <DropDown setEditing ={setEditing} data={stateData} setOption={setState} option={state} title='استان' />
          {isLoading ? <div className={styles.loading}><ThreeDots  color='rgb(192, 195, 251)' height={25} />  </div>
          :
            <DropDown setEditing ={setEditing} data={cityData} setOption={setCity} option={ city || cityData[0].name} title='شهر' />
             }
    </div>
  )
}

export default StatesForm

