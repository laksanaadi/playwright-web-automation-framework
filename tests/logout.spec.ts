import { test, expect } from '@playwright/test';


test('SL-04 - Logout', async ({ page }) => {
    const username = 'standard_user';
    const password = 'secret_sauce'
    
    // 1. Login first
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    
    await expect(page.locator('#login_button_container')).toBeVisible();

  });
