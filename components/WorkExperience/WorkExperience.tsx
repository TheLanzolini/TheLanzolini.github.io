import styles from './WorkExperience.module.css';
import ReactMarkdown from 'react-markdown';

export const WorkExperience = (props) => {
  const { workExperience } = props;
  return (
    <section id="work">
      <h3 className={styles.work_experience_title}>Work Experience</h3>
      {workExperience.map((experience) => (
        <div
          key={experience.Name}
          className={styles.work_experience_tile}
          style={{ backgroundImage: `url(${experience.background?.[0]?.url})` }}
        >
          <div className={styles.work_experience_inner}>
            <div className={styles.work_experience_wrapper}>
              <div className={styles.work_experience_top}>
                <img
                  className={styles.work_experience_badge}
                  src={experience.badge?.[0]?.url}
                />
                <div className={styles.work_experience_content}>
                  <div>{experience.Name}</div>
                  <div>{experience.Location}</div>
                  <div>{experience['Years working']} years spent here.</div>
                </div>
              </div>
              <div className={styles.work_experience_inner_p}>
                <ReactMarkdown linkTarget="_blank">
                  {experience.Description}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
