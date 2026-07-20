import {test as setup,  expect} from '@playwright/test'
import path from 'path'
const auth = path.join(__dirname, '../playwright/.auth/user.json');

setup('login and navigate to customer module', async({page})=>
{
    await page.goto('https://onetrack.industrack.com/login?returnUrl=%2FmapsTab', {waitUntil: "load"});
    await page.getByRole('textbox', {name: 'Email or Username'}).fill("support@industrack.com");
    await page.getByRole('textbox', {name: "Your password"}).fill("admin");
    await page.getByRole('button', {name: "LOGIN"}).click();
    await page.locator('.loading spinner').waitFor({state: "hidden"});
    await expect(page).toHaveURL('https://onetrack.industrack.com/mapsTab')
    await page.getByRole("dialog").getByRole("button", {name: "Close"}).first().click();
    await page.getByRole('link', {name: "Customer"}).click();
    await page.locator('.loading spinner').waitFor({state: "hidden"});
    await expect(page).toHaveURL('https://onetrack.industrack.com/crmTab/list');

    await page.context().storageState({path: auth});
})