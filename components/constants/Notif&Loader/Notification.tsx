'use client'
import styles from './Notification.module.css'
type NotificationType ={
    message:string 
    type: string , 
    triggered: boolean
}

const Notification = ({message , type , triggered}:NotificationType) => {

    const containerColor:Record<string , string> = {
        '--color' :
         type == "success" ? 'chartreuse'
        :type =='error'? "rgb(246, 59, 59)"
        :type =="warning"?"orange":'gray'
    }

  return (
    <div style={!message ?{display:'none'}:undefined} className={styles.container}>
      <div  style={{...containerColor}} className={triggered ?styles.subContainer : styles.animated}>
         <p> {message}</p>
     </div>
    </div>
  );
};

export default Notification;