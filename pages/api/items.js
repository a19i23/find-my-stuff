import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const items = await db
    .collection('items')
    .find({})
    .sort({ metacritic: -1 })
    .toArray();

  res.json(items);
};
