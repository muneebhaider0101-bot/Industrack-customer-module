import {test, expect} from '@playwright/test'
import { searchoption } from '../pages/Search'
import { Addcustomer } from '../pages/addcustomer';
import { estimate } from '../pages/estimate';


test.describe("Customer module-Search", ()=>
{
    let search: searchoption;
    let addcustomer: Addcustomer;
    let Estimate: estimate;
    test.beforeEach(async ({page})=>
    {
        search = new searchoption(page);
        addcustomer = new Addcustomer(page);
        Estimate = new estimate(page);
        await page.goto('/crmTab/list', { waitUntil: 'load' });
    })


    test("verify the search function by company name", async({page})=>
    {

    await page.getByRole('textbox', { name: "Search" }).waitFor({ state: 'visible' });
    await search.trysearch("demo"); 
    const colindex = await search.columnheader("Company");
    const result = page.getByRole("cell", {name: "demo"}).first();
    await expect(result).toBeVisible();
    })


    test("verify the search function by first name", async({page})=>
    {

    await page.getByRole('textbox', { name: "Search" }).waitFor({ state: 'visible' });
    await search.trysearch("test"); 
    const colindex = await search.columnheader("First");
    const result = page.getByRole("cell", {name: "test"}).nth(colindex);
    await expect(result).toBeVisible();
    })

    test("verify the search function by last name", async({page})=>
    {

    await page.getByRole('textbox', { name: "Search" }).waitFor({ state: 'visible' });
    await search.trysearch("2.55"); 
    const colindex = await search.columnheader("Last");
    const result = page.getByRole("cell", {name: "2.55"}).nth(colindex);
    await expect(result).toBeVisible();
    })
    
    test("verify the search function by ID", async({page})=>
    {

    await page.getByRole('textbox', { name: "Search" }).waitFor({ state: 'visible' });
    await search.trysearch("5551"); 
    const colindex= await search.columnheader("Number");
    const result = page.getByRole("cell", {name: "5551"});
    await expect(result).toBeVisible();
    })

    test("verify the search function by Location", async({page})=>
    {

    await page.getByRole('textbox', { name: "Search" }).waitFor({ state: 'visible' });
    await search.trysearch("12608 Henderson Rd Tampa FL 33625"); 
    const colindex= await search.columnheader("Location");
    const result = page.getByRole("cell", {name: "12608 Henderson Rd Tampa FL 33625"}).nth(colindex);
    await expect(result).toBeVisible();
    })

    test("WIP: Verify the functionality to navigate to the add new customer page", async ({page})=>
    {
       await page.locator('.loading spinner').waitFor({state: "hidden"});
       await addcustomer.navigate();
       page.pause();
    })

    test("Verify the functionality to add a new customer", async ({page})=>
    {
        await page.locator('.loading spinner').waitFor({state: "hidden"});
        await addcustomer.navigate();
        await addcustomer.general_info("qademo");
        await addcustomer.contact_details("qa", "demo", "NONE", "8787878787", "8987878787", "Something@gmail.com");
        await addcustomer.service_location("earth", "mkkm", "12", "mkn", "mnn","10001","mnn");
        await addcustomer.validate_address();
        await addcustomer.upload_service_contract("test-data/sample.jpg");
        await addcustomer.Tax_Paymentterms("None", "Terms - 99", "Terms - 99");
        await addcustomer.custom_pricing("10", "Premium Installation");
        await addcustomer.save();
        await page.getByRole('button', {name: 'Yes'}).first().click();
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/.*\/crmTab\/overview.*/)
        await page.pause();
    })

    test("verify the functionality to navigate to the estimate page from customer profile", async({page})=>
    {

    })


})