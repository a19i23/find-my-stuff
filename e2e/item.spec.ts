import { test, expect } from '@playwright/test';
import 'dotenv/config';
import * as login from './helpers/login';
import * as item from './helpers/item';

test.beforeEach('Login', async ({ page }) => {
  login.authenticate(page);
});

test.afterEach;

test('Create Item', async ({ page }) => {
  const ITEM_NAME = 'Blue Sail Boat(Toy)';

  await item.create(page, ITEM_NAME, 'Right (West)', 'Level 3 (Middle)');

  // await expect(
  //   page.getByText('Blue Sail Boat added to inventory'),
  // ).toBeVisible();
  await item.searchInItems(page, ITEM_NAME);
  await expect(page.getByText(ITEM_NAME)).toBeVisible();
  await item.deleteItem(page, ITEM_NAME);
});

test('Edit Item', async ({ page }) => {
  const ITEM_NAME = 'Edit item test';

  await item.create(page, ITEM_NAME);
  await item.editItem(page, ITEM_NAME, 'Left (East)', 'Level 1 (Floor)');
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}/items`);
  // await item.searchInItems(page, ITEM_NAME);

  await expect(page.getByLabel('Item Area').textContent()).toBe('Left (East)');
  await expect(page.getByLabel('Item Level').textContent()).toBe(
    'Level 1 (Floor)',
  );
  await item.deleteItem(page, ITEM_NAME);
});
