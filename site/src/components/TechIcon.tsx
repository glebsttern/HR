import {
  siApachekafka,
  siDocker,
  siKubernetes,
  siPostgresql,
  siPostman,
  siPython,
  siSpring,
} from "simple-icons";
import styles from "./TechIcon.module.css";

/** Бренд-логотипы берём из simple-icons (CC0), рисуем одним цветом — под ДС. */
const BRANDS: Record<string, { path: string }> = {
  Docker: siDocker,
  Kafka: siApachekafka,
  Kubernetes: siKubernetes,
  PostgreSQL: siPostgresql,
  Postman: siPostman,
  Python: siPython,
  Spring: siSpring,
};

/** У SQL бренда нет — свой нейтральный значок базы данных. */
const DATABASE =
  "M12 2C7.6 2 4 3.3 4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5c0-1.7-3.6-3-8-3zm6 17c0 .4-2.2 1.5-6 1.5S6 19.4 6 19v-3.3c1.5.8 3.7 1.3 6 1.3s4.5-.5 6-1.3V19zm0-5.5c0 .4-2.2 1.5-6 1.5s-6-1.1-6-1.5v-3.3c1.5.8 3.7 1.3 6 1.3s4.5-.5 6-1.3v3.3zM12 8C8.2 8 6 6.9 6 6.5S8.2 5 12 5s6 1.1 6 1.5S15.8 8 12 8z";

export function TechIcon({ name, size = 32 }: { name: string; size?: number }) {
  const path = BRANDS[name]?.path ?? DATABASE;

  return (
    <span
      className={styles.circle}
      style={{ width: size, height: size }}
      title={name}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.55}
        height={size * 0.55}
        fill="currentColor"
        role="img"
        aria-label={name}
      >
        <path d={path} />
      </svg>
    </span>
  );
}
