const { Builder, By, Key } = require('selenium-webdriver');
const assert = require('assert');

// Test Case: Search for "Selenium" on Google
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to Google
    await driver.get('https://www.google.com');

    // Find the search input field and enter "Selenium"
    let searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium', Key.RETURN);

    // Wait for the search results to load
    await driver.sleep(2000);

    // Assert that the search results page contains the word "Selenium"
    let pageSource = await driver.getPageSource();
    assert(pageSource.includes('Selenium'), 'Search results do not contain "Selenium"');

    console.log('Test passed!');
  } finally {
    // Quit the driver
    await driver.quit();
  }
})();