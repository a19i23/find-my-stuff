import { connectToDatabase } from '../util/mongodb';
import moment from 'moment';

export default function Items({ items }) {
  return (
    <div>
      <h1>My Items</h1>

      <ul>
        {items.map((item) => {
          const dbDate = item.lastupdated;
          const formattedDate = moment(dbDate).format('MM-DD-YYYY');

          return (
            <li key={item._id}>
              <h2>Name: {item.name}</h2>
              <h3>Location: {item.location}</h3>
              <p>Box number: {item.boxNumber}</p>
              <p>Date updated: {formattedDate}</p>
            </li>
          );
        })}
      </ul>
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
