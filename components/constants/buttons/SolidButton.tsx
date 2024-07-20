import styles from './SolidButton.module.css'

type SolidButtonProp ={
    text:string
}

function SolidButton({text}:SolidButtonProp) {
  return (
    <button className={styles.container}>
        {text}
    </button>
  )
}

export default SolidButton