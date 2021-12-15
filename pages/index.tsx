import Head from 'next/head';
import Airtable from 'airtable';
import yearsOfExperience from '../utils/years-of-experience';
import atFetchAllRecordsOfTable from '../utils/at-fetch-all-records-of-table';
import { Header } from '../components/Header/Header';
import { Intro } from '../components/Intro/Intro';
import { WorkExperience } from '../components/WorkExperience/WorkExperience';
import { TechnologyExperience } from '../components/TechnologyExperience/TechnologyExperience';
import { LinkShare } from '../components/LinkShare/LinkShare';
import { Footer } from '../components/Footer/Footer';

interface TechnologyExperience {
  Name: string;
  'Experience Level': string;
  Extra: string;
}

interface WorkExperience {
  Name: string;
  Location: string;
  'Years working': string;
  Description: string;
  'Currently working here'?: boolean;
  badge: any;
  background: any;
}

interface LinkShare {
  Name: string;
  url: string;
  Description: string;
}

interface AT_String {
  slug: string;
  value: string;
  attachment: any;
}

interface LandingProps {
  technologyExperience: TechnologyExperience[];
  workExperience: WorkExperience[];
  linkShare: LinkShare[];
  strings: AT_String[];
}

export async function getStaticProps() {
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const base = Airtable.base(process.env.AIRTABLE_APP_ID);

  const stringRecords = await atFetchAllRecordsOfTable(base, 'Strings');
  const formattedStrings = stringRecords.map((record) => record.fields);

  const linksRecords = await atFetchAllRecordsOfTable(base, 'Link Share');
  const formattedLinks = linksRecords.map((record) => record.fields);

  const workRecords = await atFetchAllRecordsOfTable(base, 'Work Experience');
  const formattedWorkRecords = workRecords
    .map((record) => record.fields)
    .reverse();

  const technologyRecords = await atFetchAllRecordsOfTable(
    base,
    'Technology Experience'
  );
  const formattedTechnologyRecords = technologyRecords.map(
    (record) => record.fields
  );

  return {
    props: {
      strings: formattedStrings,
      linkShare: formattedLinks,
      workExperience: formattedWorkRecords,
      technologyExperience: formattedTechnologyRecords,
    },
  };
}

const title = `Alex Lanzoni's Landing page, senior software engineer with ${yearsOfExperience} years of experience.`;
const description =
  'A visual resume of sorts where I display my work experience, my familiarity with technologies, and links to projects and social media.';
const rootUrl = 'https://thelanzolini.github.io';

export default function (props: LandingProps) {
  const { strings, workExperience, technologyExperience, linkShare } = props;

  const introString = props.strings.find(
    (string) => string.slug === 'introduction'
  );

  const introText = introString?.value ?? '----';
  const introBackground = introString?.attachment?.[0]?.url;

  const contactEmail =
    props.strings.find((string) => string.slug === 'contact-email')?.value ??
    '----';

  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Alex Lanzoni" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={rootUrl} />
        <meta property="og:image" content={`${rootUrl}/fingerguns.jpg`} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans+Condensed:ital,wght@0,300;0,400;0,700;1,300&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Intro introText={introText} introBackground={introBackground} />
      <WorkExperience workExperience={workExperience} />
      <TechnologyExperience technologyExperience={technologyExperience} />
      <LinkShare linkShare={linkShare} strings={strings} />
      <Footer contactEmail={contactEmail} />
    </main>
  );
}
