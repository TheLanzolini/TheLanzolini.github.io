import Airtable from 'airtable';

const atFetchAllRecordsOfTable = (
  base,
  tableName
): Promise<Airtable.Record<any>[]> =>
  new Promise((resolve, reject) => {
    const allRecords = [];
    base(tableName)
      .select({
        view: 'Grid view',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          console.log('hello');
          allRecords.push(...records);

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(allRecords);
          }
        }
      );
  });

export default atFetchAllRecordsOfTable;
