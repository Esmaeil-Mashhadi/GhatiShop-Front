import styles from './ProfileRoute.module.css'

interface ProfileRouteParams {
    renderCompoent: () => React.JSX.Element | undefined
}

function ProfileRoute({renderCompoent}:ProfileRouteParams) {
  return (
    <div className={styles.container}>
        {renderCompoent()}
    </div>
  )
}

export default ProfileRoute