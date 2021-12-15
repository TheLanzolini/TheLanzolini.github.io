import yearsOfExperience from '../../utils/years-of-experience';
import styles from './Intro.module.css';

interface IntroProps {
  introText: string;
  introBackground: string;
}

export const Intro = (props: IntroProps) => {
  const { introText, introBackground } = props;
  return (
    <section
      id="intro"
      className={styles.intro_container}
      style={{ backgroundImage: `url(${introBackground})` }}
    >
      <div className={styles.intro_container_inner}>
        <div className={styles.intro_container_content}>
          <h1>Welcome to Alex Lanzoni's Landing page!</h1>

          <h2>
            Senior Software Engineer with <b>{yearsOfExperience}</b> years of
            experience.
          </h2>

          <p>{introText}</p>
        </div>
      </div>
    </section>
  );
};
