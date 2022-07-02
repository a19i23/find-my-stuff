import React from 'react';
import Router from 'next/router';
import { downeyGarage } from '../../util/locations';

const EditForm = ({ item, setOpen, setOpenRocket, setSnackbar }) => {
  const [currentItem, setCurrentItem] = React.useState(item);

  async function handleSubmit() {
    setOpenRocket(true);
    const response = await fetch(`/api/updateItem/${currentItem._id}`, {
      method: 'PATCH',
      body: JSON.stringify(currentItem),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    let severity, message;
    if (data) {
      Router.reload();
      setOpen(false);
      severity = 'success';
      message = `item updated`;
    } else {
      severity = 'error';
      message = `item not updated`;
    }
    setOpenRocket(false);
    setSnackbar((prev) => {
      return {
        open: true,
        severity,
        message,
      };
    });
  }
  return (
    <>
      <div className="overflow-hidden rounded-md">
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
                type="text"
                name="itemName"
                id="itemName"
                value={currentItem?.name}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, name: e.target.value })
                }
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
                value={currentItem?.itemArea}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, itemArea: e.target.value })
                }
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
                value={currentItem?.itemLevel}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, itemLevel: e.target.value })
                }
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
                value={currentItem?.boxNumber}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, boxNumber: e.target.value })
                }
                className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleSubmit}
        >
          Confirm
        </button>
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditForm;
