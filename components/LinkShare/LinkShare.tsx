import styles from './LinkShare.module.css';

export const LinkShare = (props) => {
  const { linkShare, strings } = props;

  const linksTitle =
    strings.find((string) => string.slug === 'links-title')?.value ?? '----';
  return (
    <section id="links" className={styles.link_share}>
      <h3 className={styles.link_share_title}>Links</h3>
      <h5 className={styles.link_share_subtitle}>{linksTitle}</h5>
      <div className={styles.link_share_inner}>
        {linkShare.map((link) => (
          <a
            className={styles.link_share_block}
            key={link.Name}
            target="_blank"
            rel="noopener noreferrer"
            href={link.url}
            title={link.Description}
          >
            {link.Name}
          </a>
        ))}
      </div>
    </section>
  );
};
