import { connectToDatabase } from '../../../util/mongodb';
import { ObjectId } from 'mongodb';

const updateItem = async (req, res) => {
  const date = new Date();
  const { db } = await connectToDatabase();
  const items = db.collection('items');

  const updateObject = req.body;
  const { name, itemArea, itemLevel, boxNumber } = updateObject;
  const { itemId } = req.query;

  const filter = { _id: ObjectId(itemId) };
  const updateDoc = {
    $set: { name, itemArea, itemLevel, boxNumber, lastUpdated: date },
  };

  try {
    item = await items.findOneAndUpdate(filter, updateDoc);
    res.json(item);
  } catch (err) {
    res.send(err);
  }
};

export default updateItem;
