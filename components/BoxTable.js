import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const BoxTable = ({ data, headers, setOpenAdd }) => {
  const getRows = () => {
    const dataRows = [];
    const rows = [];

    data?.forEach((item) => {
      dataRows.push(
        <tr
          key={uuidv4()}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {item.name}
          </th>
        </tr>,
      );
    });

    rows.push(
      <div
        key={uuidv4()}
        className="flex flex-col overflow-y-auto scrollbar2 h-36"
      >
        {dataRows}
      </div>,
    );

    rows.push(
      <tr
        key={uuidv4()}
        className="bg-white dark:bg-gray-700 dark:border-gray-700"
      >
        <th
          scope="row"
          className="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="col-span-1 col-start-5">
            <button
              onClick={() => setOpenAdd(true)}
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
            >
              Add Item
            </button>
          </div>
        </th>
      </tr>,
    );
    return <tbody>{rows}</tbody>;
  };

  return (
    <div className="overflow-x-auto relative rounded-lg ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header) => {
              return (
                <th key={uuidv4()} scope="col" className="py-3 px-6">
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        {getRows()}
      </table>
    </div>
  );
};

export default BoxTable;
