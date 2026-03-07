import styles from './Architecture.module.css'
import { useInView } from '../hooks/useInView'

const layers = [
  {
    step: '01',
    label: 'Internet',
    color: '#00c7b1',
    icon: '🌐',
    desc: 'Public user sends HTTP request on Port 80',
  },
  {
    step: '02',
    label: 'Web Server EC2',
    color: '#ff9900',
    icon: '🖥️',
    desc: 'Apache + PHP processes request. Public IP exposed. web-server-sg controls inbound traffic.',
  },
  {
    step: '03',
    label: 'Private IP Channel',
    color: '#8892a4',
    icon: '🔗',
    desc: 'Secure internal VPC communication via 172.31.x.x. Never routed through internet.',
  },
  {
    step: '04',
    label: 'Database EC2',
    color: '#ff9900',
    icon: '🗄️',
    desc: 'MariaDB listens on Port 3306. No public IP. Accepts connections only from web-server-sg.',
  },
]

export default function Architecture() {
  const [ref, inView] = useInView()

  return (
    <section id="architecture" className={`${styles.section} section`} ref={ref}>
      <div className="container">
        <p className="section-label">// 02 — Architecture Overview</p>
        <h2 className="section-title">
          Layer <span className="highlight">Separation</span>
        </h2>
        <div className="divider" />

        <div className={styles.layout}>
          <div className={styles.flowWrapper}>
            {layers.map((layer, i) => (
              <div
                key={i}
                className={`${styles.flowItem} ${inView ? styles.visible : ''}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={styles.stepBubble} style={{ borderColor: layer.color }}>
                  <span className={styles.stepIcon}>{layer.icon}</span>
                </div>
                <div className={styles.flowConnector}>
                  {i < layers.length - 1 && (
                    <div className={styles.line} style={{ background: `linear-gradient(to bottom, ${layer.color}, ${layers[i + 1].color})` }} />
                  )}
                </div>
                <div className={styles.flowContent}>
                  <span className={styles.stepNum} style={{ color: layer.color }}>{layer.step}</span>
                  <h4 className={styles.stepLabel}>{layer.label}</h4>
                  <p className={styles.stepDesc}>{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.diagramWrapper} ${inView ? styles.diagramVisible : ''}`}>
            <div className={styles.diagram}>
              <div className={styles.diagramTitle}>
                <span className={styles.termCursor} />
                architecture.aws
              </div>

              <div className={styles.diagramContent}>
                <div className={styles.diagramBox} style={{ borderColor: '#00c7b1' }}>
                  <span style={{ color: '#00c7b1' }}>🌐 Public Internet</span>
                  <span className={styles.diagramArrow}>↓ HTTP :80</span>
                </div>

                <div className={styles.diagramBox} style={{ borderColor: '#ff9900' }}>
                  <div className={styles.diagramBoxHeader}>
                    <span style={{ color: '#ff9900' }}>🖥️ Web Server EC2</span>
                  </div>
                  <div className={styles.diagramMeta}>
                    <span>Apache · PHP</span>
                    <span>Public IP ✓</span>
                  </div>
                  <div className={styles.diagramSg}>web-server-sg</div>
                  <span className={styles.diagramArrow}>↓ Private IP :3306</span>
                </div>

                <div className={styles.diagramBox} style={{ borderColor: '#ff9900' }}>
                  <div className={styles.diagramBoxHeader}>
                    <span style={{ color: '#ff9900' }}>🗄️ Database EC2</span>
                  </div>
                  <div className={styles.diagramMeta}>
                    <span>MariaDB</span>
                    <span>No Public IP 🔒</span>
                  </div>
                  <div className={styles.diagramSg}>db-server-sg</div>
                </div>

                <div className={styles.diagramNote}>
                  VPC — Default · 172.31.0.0/16
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
