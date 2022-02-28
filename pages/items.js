import React, { useState, useEffect } from 'react';
import { connectToDatabase } from '../util/mongodb';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Layout from '../components/layout';
import auth0 from '../lib/auth0';

export default function Items({ items, user }) {
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
    <Layout user={user}>
      <div className="bg-white dark:bg-gray-900" style={{ height: '100vh' }}>
        <div className="flex justify-center items-center">
          <div className="overflow-x-scroll scrollbar">
            <div className="align-middle inline-block min-w-full ">
              <div className="flex flex-col items-start">
                <div className="text-gray-900 dark:text-white font-bold text-xl mx-4 mb-1">
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
              <div className="h-96 overflow-y-auto scrollbar overflow-hidden border rounded-lg border-gray-200 dark:border-gray-800">
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
                  <tbody className="divide-y-8 divide-white dark:divide-gray-900 ">
                    {tableItems?.length > 0 ? (
                      tableItems?.map((item) => {
                        const dbDate = item.lastUpdated;
                        const formattedDate =
                          moment(dbDate).format('MMMM Do YYYY');
                        const formattedTime =
                          moment(dbDate).format('h:mm:ss a');

                        return (
                          <tr
                            key={item._id}
                            className="rounded-lg bg-gray-200 dark:bg-gray-700"
                          >
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
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="min-w-full bg-gray-200 dark:bg-gray-700">
                        <td className="px-6 py-6 ">
                          <div className="text-gray-900 dark:text-gray-200">
                            No results found...
                          </div>
                        </td>
                        <td />
                        <td />
                        <td />
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication

  const session = await auth0.getSession(req, res);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/api/login',
        permanent: false,
      },
    };
  }

  const { db } = await connectToDatabase();

  const items = await db.collection('items').find({}).toArray();

  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
      user: session.user,
    },
  };
}
