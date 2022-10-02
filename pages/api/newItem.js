import { connectToDatabase } from '../../util/mongodb';

const newItem = async (req, res) => {
  const { db } = await connectToDatabase();
  const body = req.body;
  const items = body.name.split(',').map((n) => n.trim());

  const bodyItems = [];

  items.forEach((item, i) => {
    bodyItems.push({ ...body, name: items[i] });
  });

  try {
    await db.collection('items').insertMany(bodyItems);
    res.send(bodyItems);
  } catch (err) {
    res.send(err);
  }
};

export default newItem;
