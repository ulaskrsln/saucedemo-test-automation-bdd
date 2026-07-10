import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout_page';

When('I click the checkout button', async function (this: any) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.clickCheckout();
});

When('I enter first name {string} and last name {string} and postal code {string}', async function (this: any, firstName: string, lastName: string, postalCode: string) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
});

When('I click the continue button', async function (this: any) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.clickContinue();
});

When('I click the finish button', async function (this: any) {
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.clickFinish();
});

Then('the checkout complete message should be {string}', async function (this: any, expectedMessage: string) {
    const checkoutPage = new CheckoutPage(this.page);
    const actualMessage = await checkoutPage.getCompleteMessage();
    expect(actualMessage).toBe(expectedMessage);
});