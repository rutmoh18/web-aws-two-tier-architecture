import styles from './Outcomes.module.css'
import { useInView } from '../hooks/useInView'

const stats = [
  { value: '2', label: 'EC2 Instances', sub: 'Multi-server deployment' },
  { value: '3', label: 'Security Layers', sub: 'SG · Private Net · SSH' },
  { value: '5', label: 'Core Skills', sub: 'End-to-end cloud impl.' },
]

const achievements = [
  'Multi-EC2 deployment with proper network segmentation',
  'Security Group configuration with least-privilege access',
  'Private networking implementation in VPC',
  'Database provisioning and user management with SQL',
  'Complete application deployment lifecycle on AWS',
  'Real troubleshooting: HTTP 500 errors, logs analysis, service restarts',
]

export default function Outcomes() {
  const [ref, inView] = useInView()

  return (
    <section id="outcomes" className={`${styles.section} section`} ref={ref}>
      <div className="container">
        <p className="section-label">// 06 — Learning Outcomes</p>
        <h2 className="section-title">
          Results & <span className="highlight">Key Achievements</span>
        </h2>
        <div className="divider" />

        <div className={`${styles.statsRow} ${inView ? styles.visible : ''}`}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statCard} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statSub}>{s.sub}</span>
            </div>
          ))}
        </div>

        <div className={`${styles.achieveGrid} ${inView ? styles.achieveVisible : ''}`}>
          <div className={styles.achieveList}>
            <h3 className={styles.achieveTitle}>What Was Built</h3>
            <ul className={styles.list}>
              {achievements.map((a, i) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.listCheck}>✓</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>Final Result</div>
            <div className={styles.resultBody}>
              <div className={styles.resultIcon}>🏆</div>
              <h4 className={styles.resultTitle}>
                Secure Two-Tier Architecture Deployed
              </h4>
              <p className={styles.resultDesc}>
                Isolated Web and Database layers with fully functional dynamic application — data storage and retrieval via PHP + MariaDB over a private VPC network.
              </p>
              <div className={styles.resultBadges}>
                <span className={styles.badge}>✅ Web Tier</span>
                <span className={styles.badge}>✅ DB Tier</span>
                <span className={styles.badge}>✅ Secure</span>
                <span className={styles.badge}>✅ Production-Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
