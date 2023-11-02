export const create = async (
  page: any,
  name: string,
  itemArea: string = 'Right (West)',
  itemLevel: string = 'Level 3 (Middle)',
) => {
  await page.getByRole('link', { name: 'Create' }).click();
  await page.getByLabel('Item name').fill(name);
  await page.getByLabel('Item Area').selectOption(itemArea);
  await page.getByLabel('Item Level').selectOption(itemLevel);
  // await page.getByLabel('Box number').click();
  await page.getByLabel('New box?').check();
  const element = await page.getByText('my-element');
  await element.waitForValue('*');

  await page.getByRole('button', { name: 'Save' }).click();
};

export const editItem = async (
  page,
  itemName: string,
  itemArea: string,
  itemLevel: string,
) => {
  await page.getByRole('link', { name: itemName }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByLabel('Item name').fill('Edited name');
  // await page.getByLabel('Item Area').selectOption(itemArea);
  // await page.getByLabel('Item Level').selectOption(itemLevel);
  await page.getByRole('button', { name: 'Confirm' }).click();
};

export const searchInItems = async (page: any, itemName: string) => {
  await page.getByRole('link', { name: 'Items' }).click();
  await page.getByPlaceholder('Search').fill(itemName);
};

export const deleteItem = async (page: any, itemName: string) => {
  await page.getByRole('link', { name: itemName }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
};
