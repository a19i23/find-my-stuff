import { connectToDatabase } from '../../util/mongodb';

const latestBoxNumber = async (req, res) => {
  const { db } = await connectToDatabase();

  const lastBoxNumItem = await db
    .collection('items')
    .find({})
    .sort({ boxNumber: -1 })
    .limit(1)
    .toArray();

  let latestBoxNum = 0;
  if (lastBoxNumItem.length > 0) latestBoxNum = lastBoxNumItem[0].boxNumber;

  res.json(latestBoxNum);
};

export default latestBoxNumber;
