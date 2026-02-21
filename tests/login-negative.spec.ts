import { test, expect } from '@playwright/test';

test('SL-02 - Login with valid username and invalid password', async ({ page }) => {
  // Test Data
  const username = 'standard_user';
  const password = 'wrong_password';

  // 1. Navigate to SauceDemo
  await page.goto('https://www.saucedemo.com');

  // 2. Enter valid username
  await page.fill('#user-name', username);

  // 3. Enter invalid password
  await page.fill('#password', password);

  // 4. Click Login
  await page.click('#login-button');

  // 5. Validate error message appears
  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();

  // SauceDemo actual error text
  await expect(errorMessage).toContainText(
    'Username and password do not match any user in this service'
  );

  // 6. Ensure user stays on login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});