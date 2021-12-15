import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.header_inner}>
      <a href="#work">Work</a>
      <a href="#tech">Tech</a>
      <a href="#intro" className={styles.signature}>
        Alex Lanzoni
      </a>
      <a href="#links">Links</a>
      <a href="#contact">Contact</a>
    </div>
  </header>
);
