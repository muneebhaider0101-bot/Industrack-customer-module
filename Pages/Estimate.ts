import {Page, Locator} from '@playwright/test'

export class estimate
{
    private page: Page;
    private initial_date: Locator;
    private last_date: Locator;
    private addnew: Locator;
    private customersearch: Locator;
    private servicelocationsearch: Locator;
    private proceed: Locator;
    private cancel_0: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.initial_date = page.locator('#mat-input-4');
        this.last_date = page.locator('#mat-input-5');
        this.addnew = page.getByRole("button", {name: /add new/i});
        this.customersearch = page.getByRole("textbox", {name: "Type to search Customer"});
        this.servicelocationsearch = page.getByRole("textbox", {name: "Type to search Service Location"});
        this.proceed = page.getByRole("button", {name: "Proceed"});
        this.cancel_0 = page.getByRole("button", {name: "Cancel"});

    }
}