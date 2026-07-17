import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory_page';

Then('all product images should be identical', async function () {
    const inventory = new InventoryPage(this.page);
    const imageSources = await inventory.getAllProductImageSrcs();

    // Set kullanarak dizideki tekil (unique) değer sayısını buluyoruz.
    // Eğer hepsi aynıysa, Set'in boyutu 1 olmalı.
    const uniqueSources = new Set(imageSources);
    expect(uniqueSources.size).toBe(1);
});
