import { test, expect } from '@playwright/test';

test('SL-01 - Login with valid credentials', async ({ page }) => {
  // Test Data
  const username = 'standard_user';
  const password = 'secret_sauce';

  // 1. Navigate to SauceDemo
  await page.goto('https://www.saucedemo.com');

  // 2. Enter username
  await page.fill('#user-name', username);

  // 3. Enter password
  await page.fill('#password', password);

  // 4. Click Login button
  await page.click('#login-button');

  // 5. Validate user navigated to inventory page
  await expect(page).toHaveURL(/inventory/);

  // Optional additional assertion (recommended)
  await expect(page.locator('.title')).toHaveText('Products');
});