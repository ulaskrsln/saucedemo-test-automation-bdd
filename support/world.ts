import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page } from '@playwright/test';

export class CustomWorld extends World {
    browser!: Browser;
    page!: Page;

    // YENİ: RCA (Kök Neden Analizi) için kanıt toplama kutuları.
    // Her senaryo yeni bir CustomWorld örneğiyle başladığı için bunlar
    // otomatik olarak her seferinde boş başlar, senaryolar arası sızıntı olmaz.
    consoleErrors: string[] = [];
    failedRequests: string[] = [];

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);