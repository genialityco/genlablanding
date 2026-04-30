import { test, expect } from '@playwright/test';

test.describe('Landing Page Gen.Lab', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Has correct title and loads Hero', async ({ page }) => {
    await expect(page).toHaveTitle(/Gen\.Lab/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Press and Hold interaction works', async ({ page }) => {
    // Scroll to section
    await page.locator('#reto').scrollIntoViewIfNeeded();
    
    // The interactive container
    const container = page.locator('#reto').locator('.stand-gris').locator('..');
    const standColor = container.locator('.stand-color');
    const hintTooltip = container.locator('.tooltip.hint-pulse');

    // Make sure color stand starts invisible (opacity: 0)
    await expect(standColor).toHaveCSS('opacity', '0');

    // Simulate Press and Hold
    // Get bounding box to click in center
    const box = await container.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      
      // Wait for 1.6 seconds (interaction requires 1.5s)
      await page.waitForTimeout(1600);
      
      await page.mouse.up();
    }

    // Verify state changed - stand-color should now have opacity 1
    // The animation takes 0.6s to fade in
    await page.waitForTimeout(1000); 
    
    // Debugging point to see what happened
    const currentOpacity = await standColor.evaluate((el) => window.getComputedStyle(el).opacity);
    console.log(`Stand color opacity after press: ${currentOpacity}`);

    await expect(standColor).not.toHaveCSS('opacity', '0');
  });
});
