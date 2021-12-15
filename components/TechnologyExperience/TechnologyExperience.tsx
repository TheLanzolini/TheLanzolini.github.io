import styles from './TechnologyExperience.module.css';

export const TechnologyExperience = (props) => {
  const { technologyExperience } = props;
  return (
    <section id="tech" className={styles.technology_experience}>
      <h3 className={styles.technology_experience_title}>
        Technology Experience
      </h3>
      <div className={styles.experience_wrapper}>
        <div className={styles.experience_inner}>
          {technologyExperience.map((experience) => (
            <div
              key={experience.Name}
              className={
                experience.Extra
                  ? styles.experience_hoverable
                  : styles.experience
              }
            >
              <div>
                <span className={styles.experience_name}>
                  {experience.Name}
                </span>
                {experience.Extra && (
                  <span className={styles.experience_info}>i</span>
                )}
                <div
                  className={`${styles.experience_level} ${experience['Experience Level']}`}
                >
                  <span>{experience['Experience Level']}</span>
                </div>
              </div>
              {experience.Extra && (
                <div className={styles.experience_extra}>
                  {experience.Extra}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
