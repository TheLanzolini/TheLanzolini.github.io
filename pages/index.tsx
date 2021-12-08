import Head from 'next/head';
import Airtable from 'airtable';
import yearsOfExperience from '../utils/years-of-experience';
import atFetchAllRecordsOfTable from '../utils/at-fetch-all-records-of-table';
import { useEffect } from 'react';

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
}

interface LinkShare {
  Name: string;
  url: string;
  Description: string;
}

interface AT_String {
  slug: string;
  value: string;
}

interface LandingProps {
  technologyExperience: TechnologyExperience[];
  workExperience: WorkExperience[];
  linkShare: LinkShare[];
  strings: AT_String;
}

export async function getStaticProps() {
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const base = Airtable.base(process.env.AIRTABLE_APP_ID);

  const stringRecords = await atFetchAllRecordsOfTable(base, 'Strings');
  const formattedStrings = stringRecords
    .map((record) =>
      record.fields.slug && record.fields.value
        ? { slug: record.fields.slug, value: record.fields.value }
        : null
    )
    .filter((record) => record !== null);

  const linksRecords = await atFetchAllRecordsOfTable(base, 'Link Share');
  const formattedLinks = linksRecords.map((record) => record.fields);

  const workRecords = await atFetchAllRecordsOfTable(base, 'Work Experience');
  const formattedWorkRecords = workRecords.map((record) => record.fields);

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
  useEffect(() => {
    console.log('we on the client side now', props);
  }, []);

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
        <meta property="og:image" content={`${rootUrl}/image.jpg`} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
      </Head>

      <h1>{title}</h1>

      <section>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </section>
    </main>
  );
}
