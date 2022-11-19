import styles from '../styles/Home.module.css'
import UploadForm from '../components/UploadForm'

export default function Home() {
  return (
    <div className={styles.container}>
      <UploadForm />
    </div>
  )
}
