import styles from './Overview.module.css'
import { useInView } from '../hooks/useInView'

const objectives = [
  {
    icon: '🚀',
    title: 'Deploy Dynamic Web Application',
    desc: 'Implement a fully functional web application on AWS infrastructure with real-world DevOps practices.',
  },
  {
    icon: '🔒',
    title: 'Secure Two-Tier Architecture',
    desc: 'Separate Web and Database layers with private IP communication, ensuring the DB is never exposed to the internet.',
  },
  {
    icon: '🛡️',
    title: 'Production-Grade Security',
    desc: 'Apply Security Group controlled traffic and least-privilege access across all services.',
  },
]

export default function Overview() {
  const [ref, inView] = useInView()

  return (
    <section id="overview" className={`${styles.section} section`} ref={ref}>
      <div className="container">
        <p className="section-label">// 01 — Project Objective</p>
        <h2 className="section-title">
          What This <span className="highlight">Project</span> Solves
        </h2>
        <div className="divider" />

        <div className={`${styles.grid} ${inView ? styles.visible : ''}`}>
          {objectives.map((obj, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={styles.cardIcon}>{obj.icon}</div>
              <h3 className={styles.cardTitle}>{obj.title}</h3>
              <p className={styles.cardDesc}>{obj.desc}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.banner} ${inView ? styles.bannerVisible : ''}`}>
          <span className={styles.bannerLabel}>Project Type</span>
          <span className={styles.bannerValue}>Cloud Infrastructure · DevOps · AWS</span>
          <span className={styles.bannerSep}>|</span>
          <span className={styles.bannerLabel}>Instance Type</span>
          <span className={styles.bannerValue}>t2.micro — Free Tier Eligible</span>
          <span className={styles.bannerSep}>|</span>
          <span className={styles.bannerLabel}>OS</span>
          <span className={styles.bannerValue}>Amazon Linux 2023</span>
        </div>
      </div>
    </section>
  )
}
