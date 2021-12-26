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
    console.log(item);

    const response = await fetch('/api/newItem', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="itemName">Item name</label>
        <br />
        <input type="text" id="itemName" name="itemName" />
        <br />
        <label htmlFor="itemLocation">Item location</label>
        <br />
        <input type="text" id="itemLocation" name="itemLocation" />
        <br />
        <label htmlFor="boxNum">Box number</label>
        <br />
        <input type="text" id="boxNum" name="boxNum" />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
