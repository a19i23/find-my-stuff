import { connectToDatabase } from '../../util/mongodb';

const newItem = async (req, res) => {
  const { db } = await connectToDatabase();
  const body = req.body;

  const item = await db.collection('items').insertOne(body);

  res.json(item);
};

export default newItem;
