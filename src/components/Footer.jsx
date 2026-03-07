import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logoIcon}>⬡</span>
          <span>RITIK<span className={styles.accent}>.DEV</span></span>
        </div>
        <p className={styles.text}>
          AWS Two-Tier Architecture · EC2 · Apache · PHP · MariaDB
        </p>
        <p className={styles.copy}>
          Built with React + Vite · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
