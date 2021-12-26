import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const body = req.body;
  console.log('in newItem', body);

  const item = await db.collection('items').insertOne(body);

  res.json(item);
};
