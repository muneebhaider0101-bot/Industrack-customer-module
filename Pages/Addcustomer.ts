import {Page,Locator, expect} from '@playwright/test'
import path from 'node:path'

export class Addcustomer
{
    private page: Page;
    private company_name: Locator;
    private first_name: Locator;
    private last_name: Locator;
    private company_website: Locator;
    private phone: Locator;
    private mobile: Locator;
    private email: Locator;
    private Location_name: Locator;
    private street: Locator;
    private unit_number: Locator;
    private city: Locator;
    private state: Locator;
    private ZIP: Locator;
    private country: Locator;
    private billingaddresssameasservicelocation: Locator;
    private savebutton: Locator;
    private validate: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.company_name = page.getByRole("textbox", {name: "Company Name"});
        this.first_name = page.getByRole("textbox", {name: "First Name"});
        this.last_name = page.getByRole("textbox", {name: "Last Name"});
        this.company_website = page.getByRole("textbox", {name: "Company Website"});
        this.phone = page.locator('#phonenumber');
        this.mobile = page.locator("#faxnumber");
        this.email = page.getByRole("textbox", {name: "Email"});
        this.Location_name = page.getByRole("textbox", {name: "Location Name"});
        this.street = page.locator("#streetaddress");
        this.unit_number = page.locator("#unitNumber");
        this.city = page.locator("#city");
        this.state = page.locator("#state");
        this.ZIP = page.locator("#postcode");
        this.country = page.locator("#country");
        this.billingaddresssameasservicelocation = page.getByRole("checkbox", {name: "Billing address is the same"});
        this.savebutton = page.getByRole("button", {name: "Save"});
        this.validate = page.getByRole("button", {name: 'Validate Address'});
        

    }

async navigate() {
    const addButton = this.page.locator('button.btn.btn-primary.btn-sm', { hasText: /Add New/i });

    const buttonCount = await addButton.count();

    const targetButton = addButton.filter({ visible: true }).first();


    await targetButton.hover({ force: true });
    
    await this.page.waitForTimeout(1000); 
    console.log("Executing raw DOM click...");
    await targetButton.evaluate((node: HTMLElement) => node.click());

    const heading = this.page.locator('h4.modal-title', { hasText: /Add Customer/i });
    await expect(heading).toBeVisible({ timeout: 10000 });
}
    async general_info(companyname: string)
    {
        await this.page.locator(".loading-spinner").waitFor({state: 'hidden'});
        await this.company_name.fill(companyname);
    }

    async contact_details(fn?: string, ln?: string, cw?: string, ph?: string, mb?: string, em?: string)
    {
        if(fn) await this.first_name.fill(fn);
        if(ln)await this.last_name.fill(ln);
        if(cw)await this.company_website.fill(cw);
        if(ph)
            {
            await this.phone.pressSequentially(ph, {delay: 50});
            }
        if(mb)
            {
                await this.mobile.pressSequentially(mb, {delay: 50});
            }
        if(em)await this.email.fill(em);
    }

    async service_location(ltn: string, st: string, utm: string, city: string, state: string, zip: string, country: string)
    {
        if(ltn)await this.Location_name.fill(ltn);
        if(st)await this.street.fill(st);
        if(utm)await this.unit_number.fill(utm);
        if(city)await this.city.fill(city);
        if(state)await this.state.fill(state);
        if(zip) await this.ZIP.fill(zip);
        if(country)await this.country.fill(country);
    }

    async billing_address(check: boolean, ltn?: string, st?: string, utm?: string, city?: string, state?: string, zip?: string, country?: string)
    {
        if(check == false)
       {
        await this.billingaddresssameasservicelocation.uncheck();
        if(ltn)await this.Location_name.fill(ltn);
        if(st)await this.street.fill(st);
        if(utm)await this.unit_number.fill(utm);
        if(city)await this.city.fill(city);
        if(state)await this.state.fill(state);
        if(zip) await this.ZIP.fill(zip);
        if(country)await this.country.fill(country);
        }
    else
        {
        await this.billingaddresssameasservicelocation.check();
        }
    }

    async close()
    {
        await this.page.getByRole('button', {name: "Close"}).click();
    }
    async cross()
    {
        await this.page.getByRole('dialog').getByRole("button", {name: "Close dialog"}); 
    }

    async save()
    {
        await this.page.getByRole("button", {name: "Save"}).click();
    }

   async Tax_Paymentterms(option1?: string, option2?: string, option3?: string) {
        await this.page.getByRole("tab", { name: /Taxes & Payment Terms/i }).click(); 
        
        // 1. Select Tax Rate
        if(option1) {
            // Click the 1st combobox on the screen
            await this.page.getByRole('combobox').nth(0).click(); 
            await this.page.getByRole("option", { name: option1, exact: true }).click();
        }
        
        // 2. Select Payment Term for Invoices
        // 2. Select Payment Term for Invoices
        // 2. Select Payment Term for Invoices (Native HTML Select)
        if(option2) {
            // No clicking required! Just target the ID and tell Playwright which label to select
            await this.page.locator('#invoiceTermID').selectOption({ label: option2 });
        }

        // 3. Select Default Term for Estimate (Native HTML Select)
        if(option3) {
            await this.page.locator('#estimateTermID').selectOption({ label: option3 });
        }
    }

    async custom_pricing(spinbutton?: string, discount?: string) {
        // 1. Click the Custom Pricing Tab (Added the missing .click() here!)
        await this.page.getByRole("tab", { name: /Custom Pricing/i }).click(); 
        
        if(spinbutton) {
            await this.page.getByRole("spinbutton").fill(spinbutton);
        }
        if(discount) {
            // 2. Fill the search box and simulate pressing "Enter" to apply the discount search
            const searchBox = this.page.getByRole("combobox", { name: "Parts & services search" });
            await searchBox.fill(discount);
            await searchBox.press('Enter'); 
        }
    }

    async validate_address()
    {
        await this.validate.click();
        await this.page.getByRole('button', {name: 'Ok'}).click();
    }

   async upload_service_contract(filePath: string) {
    // 1. Target the button using its Role, which is much more reliable than raw text
const uploadBtn = this.page.getByRole('button', { name: /Document size should be up to/i });
    // 2. Force the page to scroll down to the button BEFORE setting the trap
    await uploadBtn.scrollIntoViewIfNeeded();

    // 3. Set the trap for the file explorer window
    const fileChooserPromise = this.page.waitForEvent("filechooser");

    // 4. Click the button (using force: true just in case a CSS layer is hovering over it)
    await uploadBtn.click({ force: true });

    // 5. Catch the window when the browser attempts to open it
    const fileChooser = await fileChooserPromise;

    // 6. Inject the file path directly into the form
    await fileChooser.setFiles(filePath);
}
}