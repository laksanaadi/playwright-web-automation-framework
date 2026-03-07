import { Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export async function login(page: Page, username: string, password: string): Promise<void> {
  const url = process.env.URL_SAUCELABS!;

  await page.goto(url);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
}