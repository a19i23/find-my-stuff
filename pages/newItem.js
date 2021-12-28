export default function Movies() {
  async function handleSubmit(e) {
    e.preventDefault();
    const date = new Date();

    const item = {
      name: e.target.itemName.value,
      location: e.target.itemLocation.value,
      boxNumber: e.target.boxNum.value,
      lastUpdated: date,
    };

    const response = await fetch('/api/newItem', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
  }

  return (
    <div
      className="flex justify-center items-center bg-white dark:bg-gray-900"
      style={{ height: '100vh' }}
    >
      <div className="mt-10 mx-4 sm:mt-4 sm:mx-10">
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
                    <div className="col-span-6 sm:col-span-3">
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
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="itemLocation"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Item location
                      </label>
                      <select
                        type="text"
                        name="itemLocation"
                        id="itemLocation"
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Wall (Back)</option>
                        <option>Wall (Middle)</option>
                        <option>Wall (Front)</option>
                        <option>TV Stand (Bottom)</option>
                        <option>TV Stand (Top)</option>
                        <option>Bookcase</option>
                        <option>Center (Front)</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="boxNum"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Box number
                      </label>
                      <input
                        type="text"
                        name="boxNum"
                        id="boxNum"
                        className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
    </div>
  );
}
