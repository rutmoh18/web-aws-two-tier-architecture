import { useState } from 'react'
import styles from './Config.module.css'
import { useInView } from '../hooks/useInView'

const webConfig = [
  { label: 'OS', value: 'Amazon Linux 2023' },
  { label: 'Instance', value: 't2.micro (Free Tier)' },
  { label: 'Public IP', value: 'Enabled — Internet Access' },
  { label: 'Private IP', value: 'Enabled — Internal Comms' },
  { label: 'Port 80', value: 'Open to 0.0.0.0/0 (HTTP)' },
  { label: 'Port 22', value: 'Restricted to My IP (SSH)' },
  { label: 'SG Name', value: 'web-server-sg' },
]

const dbConfig = [
  { label: 'OS', value: 'Amazon Linux 2023' },
  { label: 'Instance', value: 't2.micro (Free Tier)' },
  { label: 'Public IP', value: 'None — Not Exposed' },
  { label: 'Port 3306', value: 'From web-server-sg only' },
  { label: 'Engine', value: 'MariaDB 10.5 (MySQL compat.)' },
  { label: 'SG Name', value: 'db-server-sg' },
]

const sqlCommands = `CREATE DATABASE myDatabase;
USE myDatabase;

CREATE TABLE guestbook (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  message TEXT
);

CREATE USER 'Ritik'@'%' IDENTIFIED BY '••••••••';
GRANT ALL PRIVILEGES ON myDatabase.* TO 'Ritik'@'%';
FLUSH PRIVILEGES;`

export default function Config() {
  const [ref, inView] = useInView()
  const [tab, setTab] = useState('web')

  return (
    <section id="config" className={`${styles.section} section`} ref={ref}>
      <div className="container">
        <p className="section-label">// 04 — Server Configuration</p>
        <h2 className="section-title">
          Instance <span className="highlight">Setup</span>
        </h2>
        <div className="divider" />

        <div className={styles.layout}>
          <div className={`${styles.configPanel} ${inView ? styles.visible : ''}`}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${tab === 'web' ? styles.activeTab : ''}`}
                onClick={() => setTab('web')}
              >
                🖥️ Web Server
              </button>
              <button
                className={`${styles.tab} ${tab === 'db' ? styles.activeTab : ''}`}
                onClick={() => setTab('db')}
              >
                🗄️ DB Server
              </button>
            </div>

            <div className={styles.configRows}>
              {(tab === 'web' ? webConfig : dbConfig).map(({ label, value }) => (
                <div key={label} className={styles.configRow}>
                  <span className={styles.configLabel}>{label}</span>
                  <span className={styles.configValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.sqlPanel} ${inView ? styles.sqlVisible : ''}`}>
            <div className={styles.sqlHeader}>
              <span className={styles.dot} style={{ background: '#ff5f57' }} />
              <span className={styles.dot} style={{ background: '#ffbd2e' }} />
              <span className={styles.dot} style={{ background: '#28c840' }} />
              <span className={styles.sqlTitle}>database_setup.sql</span>
            </div>
            <pre className={styles.sqlCode}>{sqlCommands}</pre>
            <div className={styles.sqlNote}>
              ✅ Created database, table structure, user account, and granted full privileges for the guestbook application.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
