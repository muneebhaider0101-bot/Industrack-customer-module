import {Page, Locator} from '@playwright/test'

export class searchoption
{
    private page: Page;
    private searchbar: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.searchbar = page.getByRole('textbox', {name: "Search"});
    }

    async columnheader(columnname: string)
    {
        const header = this.page.getByRole("columnheader").allTextContents();
        return (await header).findIndex(h=>h.trim() === columnname);
    }



    async trysearch(sea: string)
    {
        await this.searchbar.fill(sea);
        await this.page.keyboard.press("Enter");
        await this.page.waitForTimeout(3000);
    }

}