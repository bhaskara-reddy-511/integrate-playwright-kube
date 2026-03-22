import {test, expect} from '@playwright/test';

import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';

test('check accessibility standards', async ({page}) =>{
    await page.goto("https://www.seasaltcornwall.com/clothing/new-arrivals-clothing");
    const axeScanResults = await new AxeBuilder({ page }).withTags(['wcag2a']).analyze();
    //expect(axeScanResults.violations).toEqual([]);

    createHtmlReport({
        results: axeScanResults,
        options: {
            outputDir: 'reports/accessibility',
            reportFileName: 'homepage-report.html'
        }
    });

})

test('check critical accessibility standards', async ({page}) =>{
    await page.goto("https://www.seasaltcornwall.com/clothing/new-arrivals-clothing");
    const axeScanResults = await new AxeBuilder({ page }).withTags(['wcag2a']).analyze();
    const critical = axeScanResults.violations.filter(v => v.impact === 'critical');

    expect(critical).toEqual([]);
})