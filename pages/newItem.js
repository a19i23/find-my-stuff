import React, { useState } from 'react';
import CustomizedSnackbar from '../components/CustomizedSnackbar';
import Rocket from '../components/Rocket';
import RocketLoading from '../components/RocketLoading';
import useSWR, { mutate } from 'swr';
import Layout from '../components/layout';
import auth0 from '../lib/auth0';
import { downeyGarage } from './locations';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function NewItem({ user }) {
  const { data: lastBoxNum, error } = useSWR('/api/latestBoxNumber', fetcher);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: '',
    message: '',
  });

  const [itemName, setItemName] = useState('');
  const [itemArea, setItemArea] = useState('');
  const [itemLevel, setItemLevel] = useState('');
  const [itemBoxNumber, setItemBoxNumber] = useState(false);

  function delay(delayInMS) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInMS);
    });
  }

  function handleNewBox(e) {
    if (e.target.checked) setItemBoxNumber(lastBoxNum + 1);
    else setItemBoxNumber('');
  }

  async function handleSubmit(e) {
    setOpen(true);
    e.preventDefault();
    const date = new Date();

    const { itemName, itemArea, itemLevel, boxNum } = e.target;
    const item = {
      name: itemName.value,
      lastUpdated: date,
    };

    if (itemArea) item.itemArea = itemArea.value;
    if (itemLevel) item.itemLevel = itemLevel.value;
    if (boxNum) item.boxNumber = parseInt(boxNum.value);

    const response = await fetch('/api/newItem', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    await delay(2000);

    let severity, message;
    if (data) {
      setItemName('');
      setItemArea('');
      setItemLevel('');
      setItemBoxNumber('');
      document.getElementById('newBox').checked = false;
      mutate('/api/latestBoxNumber');

      setOpen(false);
      severity = 'success';
      message = `${data.name} added to inventory`;
    } else {
      severity = 'error';
      message = `${data.name} not added. ${data.message}`;
    }
    setSnackbar((prev) => {
      return {
        open: true,
        severity,
        message,
      };
    });
  }

  return (
    <Layout user={user}>
      <div className="flex justify-center bg-white dark:bg-gray-900 ">
        <div className="mt-2 mx-4 sm:mt-10 sm:mx-10">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  New Item
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Add an item that will be tracked in the inventory.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden rounded-md">
                  <div className="px-4 py-5 bg-white dark:bg-gray-700 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="itemName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                          Item name
                        </label>
                        <input
                          required
                          type="text"
                          name="itemName"
                          id="itemName"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="itemArea"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                          Item Area
                        </label>
                        <select
                          type="text"
                          name="itemArea"
                          id="itemArea"
                          value={itemArea}
                          onChange={(e) => setItemArea(e.target.value)}
                          className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="" disabled hidden>
                            Select Area
                          </option>
                          {downeyGarage.areas.map((area) => (
                            <option key={area}>{area}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="itemLevel"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                          Item Level
                        </label>
                        <select
                          type="text"
                          name="itemLevel"
                          id="itemLevel"
                          value={itemLevel}
                          onChange={(e) => setItemLevel(e.target.value)}
                          className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="" disabled hidden>
                            Select Level
                          </option>
                          {downeyGarage.levels.map((level) => (
                            <option key={level}>{level}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor="boxNum"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                          Box number
                        </label>
                        <input
                          required
                          type="number"
                          name="boxNum"
                          id="boxNum"
                          value={itemBoxNumber}
                          onChange={(e) => setItemBoxNumber(e.target.value)}
                          className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="items-center col-start-5 col-span-2">
                        <label
                          htmlFor="newBox"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                          New box?
                        </label>
                        <input
                          type="checkbox"
                          name="newBox"
                          id="newBox"
                          onChange={handleNewBox}
                          className="mt-4 ml-6 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <RocketLoading open={open} setOpen={setOpen} />
        <CustomizedSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      </div>
      ,
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
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

  return {
    props: {
      user: session.user,
    },
  };
}
