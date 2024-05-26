export const dynamicStyles = ()=>{

    const hoverStyle = (enter:boolean , leave:boolean)=>{
        const style = {
   
            '--transform' : !enter && leave ? `${110}%`:
             enter ? `${0}%`:
             `${-110}%`,
    
             '--transition' :!enter && !leave ?"none": ".3s",
    
             '--brightness':enter ? "brightness(120%)" :"brightness(85%)",
        }
        return style
    }


    return {hoverStyle}

}