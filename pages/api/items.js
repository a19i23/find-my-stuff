import { connectToDatabase } from '../../util/mongodb';

const items = async (req, res) => {
  const { db } = await connectToDatabase();

  const items = await db
    .collection('items')
    .find({})
    .sort({ metacritic: -1 })
    .toArray();

  res.json(items);
};
export default items;
