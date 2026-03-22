import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto("https://www.seasaltcornwall.com/");
    await page.getByRole('button', {name:'Accept all cookies'}).click();
});

test.skip('Create new account', async ({page}) => {
    
    await page.locator("[data-block='my-account-link']").click();
    await page.getByRole('link', {name:'Sign in'}).click();
    expect(page.locator('h1', {hasText:'My Account'})).toBeVisible();
    expect(page.locator('h2', {hasText:'New Account'})).toBeVisible();
    await page.getByRole('link', {name:'Continue'}).click();
    expect(page.locator('h1', {hasText:'Create New Customer Account'})).toBeVisible();
});

test.skip('navigate to new Womens clothing collection', async ({page}) => {
    const newMenu = page.getByRole('link', {name:'Go to New submenu.'});
    newMenu.hover();
    await page.getByRole('listitem').filter({ hasText: 'New New Women\'s New Clothing' }).click();
    expect(page.getByRole('heading', {name:"New In Women's Clothing"})).toBeVisible();
});

test.skip('navigate to new Mens clothing collection', async ({page}) => {
    const newMenu = page.getByRole('link', {name:'Go to New submenu.'});
    newMenu.hover();
    await page.getByRole('listitem').filter({ hasText: 'New New Men\'s New Clothing' }).click();
    expect(page.getByRole('heading', {name:"New Men's Clothing"})).toBeVisible();
});

test.skip('navigate to new Womens clothing collection without xpath', async ({page}) => {
    const newMenu = page.getByRole('link', {name:'Go to New submenu.'});
    newMenu.hover();
    const column1 = page.locator('ul[aria-label="Submenu level 2: Column 1"]');
    const alists = column1.locator('li');
    const columnCount = await alists.count();
    for(let i=0; i< columnCount ; i++){
        const text = await alists.nth(i).locator('a').textContent();
        if(text?.trim() === 'New Clothing') {
            await alists.nth(i).locator('a').click();
            break;
        }
    }
    expect(page.getByRole('heading', {name:"New In Women's Clothing"})).toBeVisible();
    await page.getByRole('link', { name: 'Select Dresses department' }).click();
    await expect( page.getByRole('link', { name: 'Remove Category Dresses' })).toBeVisible({timeout:10000});
    const sizeCheckBox = page.getByRole('link', {name:'Select 8 size'});
    await sizeCheckBox.click();
    const removeSizeFilter = page.getByRole('link', { name: 'Remove Size 8' });
    await expect(removeSizeFilter).toBeVisible();
    await removeSizeFilter.click();
    await expect(removeSizeFilter).toBeHidden();
});

test.skip('navigate to new Mens clothing collection without xpath', async ({page}) => {
    const newMenu = page.getByRole('link', {name:'Go to New submenu.'});
    newMenu.hover();
    const column1 = page.locator('ul[aria-label="Submenu level 2: Column 2"]');
    const alists = column1.locator('li');
    const columnCount = await alists.count();
    for(let i=0; i< columnCount ; i++){
        const text = await alists.nth(i).locator('a').textContent();
        if(text?.trim() === 'New Clothing') {
            await alists.nth(i).locator('a').click();
            break;
        }
    }
    const headingText = await page.getByRole('heading').first().textContent();
    expect(headingText?.trim()).toEqual("New Men's Clothing");
});

test('navigate to new Womens clothing collection  and check sort by', async ({page}) => {
    const newMenu = page.getByRole('link', {name:'Go to New submenu.'});
    newMenu.hover();
    const column1 = page.locator('ul[aria-label="Submenu level 2: Column 1"]');
    const alists = column1.locator('li');
    const columnCount = await alists.count();
    for(let i=0; i< columnCount ; i++){
        const text = await alists.nth(i).locator('a').textContent();
        if(text?.trim() === 'New Clothing') {
            await alists.nth(i).locator('a').click();
            break;
        }
    }
    expect(page.getByRole('heading', {name:"New In Women's Clothing"})).toBeVisible();
    const categoryDropdown = page.locator('#sorter').getByRole('combobox');
    await expect(categoryDropdown).toBeVisible();
    await categoryDropdown.selectOption({ label: 'Latest styles' });
});



    