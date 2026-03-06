import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string): Promise<void> {
  await page.goto('https://krisdemo.sqlview.com.sg/KRIS/login.do?method=reloadLogin');
  await page.fill('#userId', username);
  await page.fill('#password', password);
  await page.click('#submitButton');
}