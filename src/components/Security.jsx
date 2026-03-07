import styles from './Security.module.css'
import { useInView } from '../hooks/useInView'

const rules = [
  {
    icon: '🚫',
    title: 'DB Not Publicly Accessible',
    desc: 'No inbound rules for port 3306 from 0.0.0.0/0. The database EC2 has no public IP — completely isolated from the internet.',
    color: '#ff5f57',
  },
  {
    icon: '🔑',
    title: 'SSH Limited to Trusted IP',
    desc: 'Port 22 is restricted exclusively to the administrator\'s public IP. Zero risk of brute-force from the open internet.',
    color: '#ff9900',
  },
  {
    icon: '🔗',
    title: 'Private IP Communication',
    desc: 'Web and DB servers communicate exclusively via internal VPC network (172.31.x.x). Traffic never leaves AWS infrastructure.',
    color: '#00c7b1',
  },
]

const flow = [
  { from: 'User', to: 'Web Server', port: ':80', label: 'HTTP Request', color: '#00c7b1' },
  { from: 'Web Server', to: 'PHP Processor', port: '', label: 'Apache → PHP', color: '#ff9900' },
  { from: 'PHP', to: 'Database', port: ':3306', label: 'Private IP Only', color: '#ff9900' },
  { from: 'Database', to: 'PHP', port: '', label: 'Query Response', color: '#ff9900' },
  { from: 'PHP', to: 'User', port: ':80', label: 'HTML Response', color: '#00c7b1' },
]

export default function Security() {
  const [ref, inView] = useInView()

  return (
    <section id="security" className={`${styles.section} section`} ref={ref}>
      <div className="container">
        <p className="section-label">// 05 — Security & Network Flow</p>
        <h2 className="section-title">
          Defense in <span className="highlight">Depth</span>
        </h2>
        <div className="divider" />

        <div className={`${styles.rulesGrid} ${inView ? styles.visible : ''}`}>
          {rules.map((rule, i) => (
            <div key={i} className={styles.ruleCard} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className={styles.ruleIconWrap} style={{ background: `${rule.color}18`, borderColor: `${rule.color}40` }}>
                <span className={styles.ruleIcon}>{rule.icon}</span>
              </div>
              <div>
                <h4 className={styles.ruleTitle} style={{ color: rule.color }}>{rule.title}</h4>
                <p className={styles.ruleDesc}>{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.flowSection} ${inView ? styles.flowVisible : ''}`}>
          <h3 className={styles.flowTitle}>Network Request Flow</h3>
          <div className={styles.flowTrack}>
            {flow.map((step, i) => (
              <div key={i} className={styles.flowStep}>
                <div className={styles.flowNode} style={{ borderColor: step.color }}>
                  <span className={styles.flowFrom}>{step.from}</span>
                </div>
                <div className={styles.flowArrow} style={{ color: step.color }}>
                  <span className={styles.flowPort}>{step.port}</span>
                  <span className={styles.flowLine} style={{ background: step.color }} />
                  <span className={styles.flowLabel}>{step.label}</span>
                  →
                </div>
                {i === flow.length - 1 && (
                  <div className={styles.flowNode} style={{ borderColor: step.color }}>
                    <span className={styles.flowFrom}>{step.to}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
