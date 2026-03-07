import { test, expect } from '@playwright/test';
import { login } from '../utils/login.ts';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Saucelabs', () => {

test('SL-02 - Login with valid username and invalid password', async ({ page }) => {
  // Test Data
  const username = process.env.USERNAME_SAUCELABS!;
  const password = process.env.PASSWORD_WRONG!;

  await login(page, username, password);

  // Validate error message appears
  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();

  // SauceDemo actual error text
  await expect(errorMessage).toContainText(
    'Username and password do not match any user in this service'
  );

  // Ensure user stays on login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

});