import { test, expect } from '@playwright/test';
import { login } from '../utils/login.ts';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Saucelabs', () => {

test('SL-01 - Login with valid credentials', async ({ page }) => {
  // Test Data
  const username = process.env.USERNAME_SAUCELABS!;
  const password = process.env.PASSWORD_SAUCELABS!;
  
  await login(page, username, password);

  // Validate user navigated to inventory page
  await expect(page).toHaveURL(/inventory/);

  // Optional additional assertion (recommended)
  await expect(page.locator('.title')).toHaveText('Products');
});

});