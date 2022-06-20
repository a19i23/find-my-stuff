import { connectToDatabase } from '../../util/mongodb';

const newItem = async (req, res) => {
  const { db } = await connectToDatabase();
  const body = req.body;
  let item = {};
  try {
    item = await db.collection('items').insertOne(body);
    res.send(body);
  } catch (err) {
    res.send(err);
  }
};

export default newItem;
