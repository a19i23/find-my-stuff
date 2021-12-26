import React from 'react';
import moment from 'moment';
import { useTable } from 'react-table';
import { connectToDatabase } from '../../util/mongodb';

export default function ItemTable({ items }) {
  const data = React.useMemo(
    () =>
      items.map((item) => {
        const dbDate = item.lastUpdated;
        const formattedDate = moment(dbDate).format('MMMM Do YYYY, h:mm:ss a');
        return {
          ...item,
          lastUpdated: formattedDate,
        };
      }),
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Box Number',
        accessor: 'boxNumber',
      },
      {
        Header: 'Last Updated',
        accessor: 'lastUpdated',
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
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
