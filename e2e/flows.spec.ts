import { test, expect } from '@playwright/test';

test.describe('CardForge End-to-End Tests', () => {
  test('F01-H1: Landing page loads and navigates to Studio', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Beautiful link previews.' })).toBeVisible();
    await expect(page.locator('.md\\:col-span-7').getByText(/With CardForge/)).toBeVisible();

    // Click Get started
    await page.getByRole('link', { name: 'Get started for free' }).first().click();
    await expect(page).toHaveURL(/\/customize/);
    await expect(page.locator('#title-input')).toBeVisible();
  });

  test('F01-H2: Customizer updates inputs, themes, and dark mode', async ({ page }) => {
    await page.goto('/customize');

    // Change title
    const titleInput = page.locator('#title-input');
    await titleInput.fill('Changelog v2.4 Release Notes');
    await expect(page.locator('h1')).toContainText('Changelog v2.4 Release Notes');

    // Switch to dark mode
    await page.click('button:has-text("Dark")');
    // Card should now have dark background
    await expect(page.locator('button:has-text("Dark")')).toHaveClass(/border-purple-600/);

    // Switch pattern
    await page.click('button:has-text("Topography")');
    await expect(page.locator('button:has-text("Topography")')).toHaveClass(/border-purple-600/);
  });

  test('F01-H3: Use this code opens snippet modal with tabs', async ({ page }) => {
    await page.goto('/customize');

    // Click "Use this code on my site"
    await page.click('button:has-text("Use this code on my site")');
    await expect(page.locator('text=Step 2: Use image on your website')).toBeVisible();

    // Check tabs
    await page.click('button:has-text("Next.js Metadata")');
    await expect(page.locator('pre')).toContainText('// Next.js App Router');

    await page.click('button:has-text("Markdown")');
    await expect(page.locator('pre')).toContainText('![');

    // Close modal
    await page.click('button:has-text("Close")');
    await expect(page.locator('text=Step 2: Use image on your website')).not.toBeVisible();
  });

  test('F02-H1: Pro paywall modal triggers on watermark toggle', async ({ page }) => {
    await page.goto('/customize');

    // Click watermark toggle
    await page.click('#watermark-toggle');
    await expect(page.locator('text=Automate all your link previews')).toBeVisible();
    await expect(page.getByText('$9', { exact: true })).toBeVisible();

    // Switch billing
    await page.click('button:has-text("Annual")');
    await expect(page.getByText('$7', { exact: true })).toBeVisible();
  });

  test('F03-H1: Dynamic API endpoint /m generates PNG image', async ({ request }) => {
    const response = await request.get('/m?title=Test+Title&url=example.com&theme=bold&color=purple');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('image/png');
  });

  test('F03-H2: /api/og without parameters returns valid 200 image/png', async ({ request }) => {
    const response = await request.get('/api/og');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('image/png');
  });
});
