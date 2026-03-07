import styles from './TechStack.module.css'
import { useInView } from '../hooks/useInView'

const services = [
  {
    name: 'Amazon EC2',
    icon: '🖥️',
    desc: 'Virtual servers for both web and database tiers',
    tag: 'Compute',
    color: '#ff9900',
  },
  {
    name: 'Security Groups',
    icon: '🔒',
    desc: 'Stateful firewall rules controlling traffic between instances',
    tag: 'Networking',
    color: '#00c7b1',
  },
  {
    name: 'VPC (Default)',
    icon: '🌐',
    desc: 'Virtual Private Cloud providing network isolation for the architecture',
    tag: 'Networking',
    color: '#00c7b1',
  },
  {
    name: 'Public & Private IP',
    icon: '📡',
    desc: 'Addressing scheme for internet-facing and internal-only access',
    tag: 'Networking',
    color: '#ff9900',
  },
  {
    name: 'SSH Access',
    icon: '🔑',
    desc: 'Encrypted remote administration, restricted to trusted IPs only',
    tag: 'Security',
    color: '#f4c430',
  },
]

const appStack = [
  { name: 'Apache HTTP', role: 'Web Server', cmd: 'sudo dnf install httpd -y' },
  { name: 'PHP + php-mysqlnd', role: 'Backend + DB Connector', cmd: 'sudo dnf install php php-mysqlnd -y' },
  { name: 'MariaDB 10.5', role: 'Database Engine', cmd: 'sudo dnf install mariadb105-server -y' },
]

export default function TechStack() {
  const [ref, inView] = useInView()

  return (
    <section id="stack" className={`${styles.section} section`} ref={ref}>
      <div className="container">
        <p className="section-label">// 03 — AWS Services Used</p>
        <h2 className="section-title">
          Technology <span className="highlight">Stack</span>
        </h2>
        <div className="divider" />

        <div className={`${styles.servicesGrid} ${inView ? styles.visible : ''}`}>
          {services.map((s, i) => (
            <div
              key={i}
              className={styles.serviceCard}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={styles.serviceTop}>
                <span className={styles.serviceIcon}>{s.icon}</span>
                <span className={styles.serviceTag} style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
              </div>
              <h4 className={styles.serviceName}>{s.name}</h4>
              <p className={styles.serviceDesc}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className={`${styles.appStack} ${inView ? styles.appVisible : ''}`}>
          <h3 className={styles.appTitle}>Application Installation Commands</h3>
          <div className={styles.codeBlock}>
            {appStack.map((item, i) => (
              <div key={i} className={styles.codeLine}>
                <span className={styles.codeComment}># {item.name} — {item.role}</span>
                <span className={styles.codeCmd}>{item.cmd}</span>
              </div>
            ))}
            <div className={styles.codeLine}>
              <span className={styles.codeComment}># Start & enable services on boot</span>
              <span className={styles.codeCmd}>sudo systemctl start httpd mariadb</span>
            </div>
            <div className={styles.codeLine}>
              <span className={styles.codeCmd}>sudo systemctl enable httpd mariadb</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
