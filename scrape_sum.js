// scrape_sum.js
const { chromium } = require('playwright');

const urls = Array.from({ length: 10 }, (_, i) => `https://datadash-iitm.vercel.app/data?seed=${46 + i}`);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url);
    const tables = await page.$$('table');
    for (const table of tables) {
      const cells = await table.$$eval('td', tds =>
        tds.map(td => parseFloat(td.textContent.trim())).filter(val => !isNaN(val))
      );
      grandTotal += cells.reduce((a, b) => a + b, 0);
    }
  }

  console.log('TOTAL SUM:', grandTotal.toFixed(2));
  await browser.close();
})();
