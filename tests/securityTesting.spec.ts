import {test} from '@playwright/test';

import fs from 'fs';

const urls = new Set();

test('collect urls', async ({ page }) => {

  page.on('request', request => {
    const url = request.url();

    if (url.startsWith('https://my-app.com')) {
      urls.add(url);
    }
  });

  await page.goto('https://my-app.com');

  await page.click('text=Login');
  await page.click('text=Products');
  await page.click('text=Checkout');

});

test.afterAll(() => {
  fs.writeFileSync('zap-urls.json', JSON.stringify([...urls], null, 2));
});