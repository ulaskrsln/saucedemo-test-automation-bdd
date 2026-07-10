import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SortingPage } from '../pages/sorting_page';

When('I select the sort option {string}', async function (sortOption: string) {
  const sortingPage = new SortingPage(this.page);
  await sortingPage.selectSortOption(sortOption);
});

Then('the product list should be sorted by {string}', async function (sortOption: string) {
  const sortingPage = new SortingPage(this.page);

  if (sortOption.includes('Name')) {
    const actualNames = await sortingPage.getProductNames();
    const expectedNames = [...actualNames].sort((a, b) => {
      return sortOption.includes('Z to A') ? b.localeCompare(a) : a.localeCompare(b);
    });

    expect(actualNames).toEqual(expectedNames);
  } else if (sortOption.includes('Price')) {
    const actualPrices = await sortingPage.getProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => {
      return sortOption.includes('high to low') ? b - a : a - b;
    });

    expect(actualPrices).toEqual(expectedPrices);
  }
});