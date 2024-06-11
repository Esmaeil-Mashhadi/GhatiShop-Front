import styles from './Categories.module.css';
import AddCategory from '../submodules/adminCategory/AddCategory';
import { ReactElement, useState } from 'react';
import AddLayer from '../submodules/adminCategory/AddLayer';
import { TbTrash } from 'react-icons/tb';

function AdminCategories() {
  const [catLayers, setCatLayers] = useState<(ReactElement|string)[]>([]);

  const addLayerHandler = () => {
    setCatLayers([...catLayers, '']); 
  }; 

  const deleteLayerHandler = (index:number)=>{
     const cateList = [...catLayers]
     cateList.splice(index ,1)
     setCatLayers(cateList) 
   } 

  return (
    <div className={styles.container}>
      <div className={styles.addCategory}>
        <h3>اضافه کردن دسته بندی جدید</h3>
        <div className={styles.main}>
          <AddCategory handler={addLayerHandler} />
        </div> 
        { catLayers.map((Component, index)=>(
          <div className={styles.layerContainer}> 
           {<AddLayer layerNumber={index + 1} />}
           <TbTrash onClick={()=>deleteLayerHandler(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;