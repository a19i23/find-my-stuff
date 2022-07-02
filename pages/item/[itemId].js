import { ObjectId } from 'mongodb';
import React, { useState } from 'react';
import CustomizedSnackbar from '../../components/CustomizedSnackbar';
import Layout from '../../components/layout';
import RocketLoading from '../../components/RocketLoading';
import auth0 from '../../lib/auth0';
import { connectToDatabase } from '../../util/mongodb';
import EditModal from './EditModal';

const Item = ({ item, user }) => {
  const [open, setOpen] = useState(false);
  const [openRocket, setOpenRocket] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: '',
    message: '',
  });

  return (
    <Layout user={user}>
      <div className="flex justify-center bg-white dark:bg-gray-900 ">
        <div className="flex justify-center" style={{ height: '50vh' }}>
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white dark:bg-gray-700 shadow-lg">
            {/* <img
              className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
              alt=""
            /> */}
            <div className="flex flex-col justify-center">
              <div className="p-6 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="itemName"
                    className="text-md font-medium text-gray-700 dark:text-gray-200"
                  >
                    Item name:
                  </label>
                  <label
                    id="itemName"
                    className="ml-4 text-md text-gray-700 dark:text-gray-400 "
                  >
                    {item.name}
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="itemArea"
                    className="text-md font-medium text-gray-700 dark:text-gray-200"
                  >
                    Item Area:
                  </label>
                  <label
                    id="itemArea"
                    className="ml-4 text-md text-gray-700 dark:text-gray-400"
                  >
                    {item.itemArea}
                  </label>
                </div>

                <div className=" col-span-6 sm:col-span-3">
                  <label
                    htmlFor="itemLevel"
                    className="text-md font-medium text-gray-700 dark:text-gray-200"
                  >
                    Item Level:
                  </label>
                  <label
                    id="itemLevel"
                    className="ml-4 text-md text-gray-700 dark:text-gray-400"
                  >
                    {item.itemLevel}
                  </label>
                </div>

                <div className=" col-span-6">
                  <label
                    htmlFor="boxNum"
                    className="text-md font-medium text-gray-700 dark:text-gray-200"
                  >
                    Box number:
                  </label>
                  <label
                    id="boxNum"
                    className="ml-4 text-md text-gray-700 dark:text-gray-400"
                  >
                    {item.boxNumber}
                  </label>
                </div>
                <div className="col-span-2 col-start-6 mt-6">
                  <button
                    onClick={() => setOpen(true)}
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  {open && (
                    <EditModal
                      item={item}
                      setOpen={setOpen}
                      setOpenRocket={setOpenRocket}
                      setSnackbar={setSnackbar}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <RocketLoading open={openRocket} />
        <CustomizedSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      </div>
    </Layout>
  );
};

export default Item;

export async function getServerSideProps({ req, res, params }) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication

  const session = await auth0.getSession(req, res);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/api/login',
        permanent: false,
      },
    };
  }

  const { db } = await connectToDatabase();

  const item = await db
    .collection('items')
    .find(ObjectId(params.itemId))
    .next();

  console.log('item', item);

  return {
    props: {
      item: JSON.parse(JSON.stringify(item)),
      user: session.user,
    },
  };
}
