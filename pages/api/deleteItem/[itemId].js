import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

const deleteItem = async (req, res) => {
  const { db } = await connectToDatabase();
  const items = db.collection('items');
  const { itemId } = req.query;

  const filter = { _id: ObjectId(itemId) };

  try {
    item = await items.deleteOne(filter);
    res.json(item);
  } catch (err) {
    res.send(err);
  }
};

export default deleteItem;
