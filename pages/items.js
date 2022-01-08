import React, { useState, useEffect } from 'react';
import { connectToDatabase } from '../util/mongodb';
import moment from 'moment';
import Paper from '@mui/material/Paper';

export default function Items({ items }) {
  const [search, setSearch] = useState('');
  const [tableItems, setTableItems] = useState();

  useEffect(() => {
    if (search) {
      const filteredItems = items?.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.location.toLowerCase().includes(search.toLowerCase()),
      );
      setTableItems(filteredItems);
    } else {
      setTableItems(items);
    }
  }, [items, search]);

  return (
    <div className="bg-white dark:bg-gray-900" style={{ height: '100vh' }}>
      <div className="flex justify-center items-center">
        <div className="overflow-x-auto mt-10 mx-4 sm:mx-10">
          <div className="align-middle inline-block min-w-full ">
            <div className="flex flex-col items-start">
              <div className="text-gray-900 dark:text-white font-bold text-xl mx-4 mt-8 mb-1">
                My Items
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-6 px-2 ml-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 outline-none border dark:border-gray-700 rounded-md mb-2"
                placeholder="Search"
              />
            </div>
            <div className="h-96 overflow-y-scroll scrollbar overflow-hidden border rounded-lg border-gray-200 dark:border-gray-800">
              <table className="min-w-full table-fixed">
                <thead className="sticky top-0 bg-white dark:bg-gray-900">
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
                {/* <tbody className="bg-white divide-y-8 divide-gray-200 dark:bg-gray-800 dark:divide-gray-900"> */}
                <tbody className=" divide-y-8 divide-white dark:divide-gray-900 ">
                  {tableItems?.map((item) => {
                    const dbDate = item.lastUpdated;
                    const formattedDate = moment(dbDate).format('MMMM Do YYYY');
                    const formattedTime = moment(dbDate).format('h:mm:ss a');

                    return (
                      <tr
                        key={item._id}
                        className="rounded-lg bg-gray-200 dark:bg-gray-700"
                      >
                        {/* <div className="flex items-center rounded-lg bg-gray-700"> */}
                        <td className="px-6">
                          <div className="flex items-center">
                            <div className="whitespace-pre-wrap text-sm font-medium text-gray-900 dark:text-gray-200">
                              {item.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-400">
                            {item.location}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-400">
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
                        {/* </div> */}
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
