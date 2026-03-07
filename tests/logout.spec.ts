import { test, expect } from '@playwright/test';
import { login } from '../utils/login.ts';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Saucelabs', () => {

test('SL-04 - Logout', async ({ page }) => {
  // Test Data
  const username = process.env.USERNAME_SAUCELABS!;
  const password = process.env.PASSWORD_SAUCELABS!;

  await login(page, username, password);
  
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
    
  await expect(page.locator('#login_button_container')).toBeVisible();

  });
});