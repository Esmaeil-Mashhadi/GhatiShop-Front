import { MouseEventHandler, useState  } from 'react';
import styles from './Button.module.css'
import { dynamicStyles } from '@/utils/dynamicStyles/HoverButtonStyle';
import buttonFunction from '../functions/ButtonFunction';

interface buttonPropType {
  text:string 
  styleClass?:string , 
  handler:MouseEventHandler,
  disabled?:boolean
  svg?:any
}
const Button = ({text, styleClass, handler , disabled , svg}:buttonPropType) => {

  const [enter, setEnter] = useState(false);
  const [leave, setLeave] = useState(false);

  const {enterHandler , leaveHandler} = buttonFunction
  const { hoverStyle } = dynamicStyles();
  const style:Record<string , string> = hoverStyle(enter, leave );

  const disableStyle:Record<string , string|number>={
     '--opacity' : disabled ? 0 :1,
     '--event': disabled ? 'none' : 'auto',
     '--select':disabled?'none' : 'auto'
  }


  return (
    <button
      style={{...style , ...disableStyle}}
      onMouseEnter={()=>enterHandler(setEnter)}
      onMouseLeave={()=>leaveHandler(setEnter,setLeave)}
      className={styleClass}
      onClick={handler}
      disabled ={disabled}
    >
      {text}
      {svg ? svg: undefined}
    </button>
  );
};

export const SubmitButton = ({ text, handler , disabled }:buttonPropType) => {
  return (
    <Button
      text={text}
      styleClass={styles.submitButton}
      handler={handler}      
      disabled ={disabled}
    />
  );
};

export const CancelButton = ({ text, handler , disabled }:buttonPropType) => {
  return (
    <Button
      text={text}
      styleClass={styles.cancelButton}
      handler={handler}
      disabled ={disabled}

    />
  );
};
export const NeutralButton = ({ text, handler , disabled}:buttonPropType) => {
  return (
    <Button
      disabled ={disabled}
      text={text}
      styleClass={styles.neutralButton}
      handler={handler}
    />
  );
};