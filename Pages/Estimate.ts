import {Page, Locator} from '@playwright/test'

export class estimate
{
    private page: Page;

    constructor(page: Page)
    {
        this.page = page;
    }
}