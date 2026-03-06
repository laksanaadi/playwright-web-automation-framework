import { test, expect } from '@playwright/test';

test('SL-03 - Add product to cart and complete checkout', async ({ page }) => {
  // Test Data
  const username = 'standard_user';
  const password = 'secret_sauce';

  const productName = 'Sauce Labs Backpack';
  const firstName = 'John';
  const lastName = 'Doe';
  const postalCode = '12345';

  // 1. Login first
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');

  // Ensure login success
  await expect(page).toHaveURL(/inventory/);

  // 2. Add product to cart
  await page.locator('.inventory_item')
    .filter({ hasText: productName })
    .locator('button')
    .click();

  // Validate cart badge shows 1 item
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 3. Click cart icon
  await page.click('.shopping_cart_link');

  // Validate product exists in cart
  await expect(page.locator('.inventory_item_name'))
    .toHaveText(productName);

  // 4. Click Checkout
  await page.click('#checkout');

  // 5. Fill checkout information
  await page.fill('#first-name', firstName);
  await page.fill('#last-name', lastName);
  await page.fill('#postal-code', postalCode);

  // 6. Continue
  await page.click('#continue');

  // Validate overview page
  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('.inventory_item_name'))
    .toHaveText(productName);

  // 7. Finish
  await page.click('#finish');

  // Validate checkout complete
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});