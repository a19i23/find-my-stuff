import { connectToDatabase } from '../util/mongodb';
import moment from 'moment';

export default function Items({ items }) {
  return (
    <div className="bg-white dark:bg-gray-900" style={{ height: '100vh' }}>
      <div className="flex justify-center items-center">
        <div className="overflow-x-auto mt-10 mx-4 sm:mx-10">
          <div className="align-middle inline-block min-w-full ">
            <div className="text-gray-900 dark:text-white font-bold text-xl px-8 pt-8 pb-2">
              My Items
            </div>
            <div className="shadow-md h-96 overflow-y-scroll overflow-hidden border-b border-gray-200 dark:border-gray-800 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="sticky top-0 bg-gray-50 dark:bg-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider"
                    >
                      Box Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider"
                    >
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
                  {items.map((item) => {
                    const dbDate = item.lastUpdated;
                    const formattedDate = moment(dbDate).format('MMMM Do YYYY');
                    const formattedTime = moment(dbDate).format('h:mm:ss a');

                    return (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-400">
                            {item.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 text-center dark:text-gray-400">
                            {item.boxNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
                          <div className="text-sm text-gray dark:text-gray-400">
                            {formattedDate}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formattedTime}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const items = await db.collection('items').find({}).toArray();

  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
    },
  };
}
