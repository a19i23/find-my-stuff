import { connectToDatabase } from '../../util/mongodb';
import auth0 from '../../lib/auth0';
import EditModal from '../item/EditModal';
import DeleteModal from '../DeleteModal';
import Layout from '../../components/layout';
import BoxTable from '../../components/BoxTable';

const Box = ({ items, user }) => {
  console.log(items[0]);
  console.log(items);
  const { boxNumber, itemArea, itemLevel } = items[0];
  return (
    <Layout user={user}>
      {/* <div className="flex justify-center bg-white dark:bg-gray-900 "> */}
      <div className="flex justify-center" style={{ height: '75vh' }}>
        <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg  shadow-lg">
          {/* <img
              className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
              src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
              alt=""
            /> */}
          <div className="flex flex-col justify-center">
            <div className="p-6 grid grid-cols-6 gap-x-2 gap-y-6">
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
                  {boxNumber}
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
                  {itemArea}
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
                  {itemLevel}
                </label>
              </div>

              <div className=" col-span-6">
                <BoxTable headers={['Name']} data={items} />
              </div>

              {/* <div className="col-span-1 col-start-5 mt-4">
                <button
                  onClick={() => setOpenEdit(true)}
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                >
                  Edit
                </button>
              </div> */}
              <div className="col-span-1 col-start-6 mt-4">
                <button
                  onClick={() => setOpenDelete(true)}
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* {openEdit && (
            <EditModal
              item={item}
              setOpen={setOpenEdit}
              setOpenRocket={setOpenRocket}
              setSnackbar={setSnackbar}
            />
          )}
          {openDelete && (
            <DeleteModal
              item={item}
              setOpen={setOpenDelete}
              setOpenRocket={setOpenRocket}
              setSnackbar={setSnackbar}
            />
          )} */}
      </div>
      {/* <RocketLoading open={openRocket} /> */}
      {/* <CustomizedSnackbar snackbar={snackbar} setSnackbar={setSnackbar} /> */}
      {/* </div> */}
    </Layout>
  );
};

export default Box;
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

  const query = { boxNumber: parseInt(params.boxNumber) };
  const items = await db.collection('items').find(query).toArray();

  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
      user: session.user,
    },
  };
}
