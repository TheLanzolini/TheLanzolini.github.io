import styles from './Footer.module.css';

export const Footer = (props) => {
  const { contactEmail } = props;
  return (
    <footer className={styles.footer} id="contact">
      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
    </footer>
  );
};
