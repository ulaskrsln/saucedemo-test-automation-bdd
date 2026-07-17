import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BurgerMenuPage } from '../pages/burger_menu_page';

When('I log out from the menu', async function () {
    const menu = new BurgerMenuPage(this.page);
    await menu.logout();
});

Then('I should be on the login page', async function () {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
});

When('I reset the app state from the menu', async function () {
    const menu = new BurgerMenuPage(this.page);
    await menu.resetAppState();
});

When('I click the browser back button', async function () {
    await this.page.goBack();
});