import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout_page';
import { InventoryPage } from '../pages/inventory_page';

Then('the last name field should remain empty', async function () {
    const checkoutPage = new CheckoutPage(this.page);
    const value = await checkoutPage.getLastNameValue();
    expect(value).toBe('');
});

Then('I should still be on the checkout overview page', async function () {
    // finish butonu gerçekten çalışsaydı checkout-complete.html'e geçerdik.
    // error_user'da bu geçiş olmuyor, URL step-two'da kalıyor.
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
});

Then('the first product image should differ from the other product images', async function () {
    const inventory = new InventoryPage(this.page);
    const imageSources = await inventory.getAllProductImageSrcs();
    const [firstImage, ...restImages] = imageSources;

    // Diğer 5 ürünün resimleri normal ürün resimleri olmalı — yani birbirinden
    // FARKLI olmalılar (her ürünün kendi doğru görseli var), problem_user'daki
    // gibi hepsi aynı DEĞİL.
    const uniqueRest = new Set(restImages);
    expect(uniqueRest.size).toBe(restImages.length);

    // İlk resim (köpek), diğer resimlerden herhangi biriyle aynı olmamalı
    expect(restImages).not.toContain(firstImage);
});