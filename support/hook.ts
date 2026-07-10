import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

// 60 saniye timeout (Global ayar)
setDefaultTimeout(60 * 1000);

// Test İzolasayonu: Her bir "Scenario" başlamadan önce temiz bir tarayıcı açar.
Before(async function () {
    const isCI = process.env.CI ? true : false;
    
    // Tarayıcı ve sayfayı doğrudan 'this' (World) bağlamına atıyoruz!
    this.browser = await chromium.launch({ headless: isCI }); 
    this.page = await this.browser.newPage();
});

// Kaynak Yönetimi: Test bitince tarayıcıyı güvenli şekilde kapatır.
After(async function () {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
});