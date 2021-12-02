import BasePage from "../BasePage";

export default class DashboardPage extends BasePage {
    constructor() {
        super({appName: 'pwPortal'});
    }

    /**
     * This is a classic example of page ob model in which you create api that represents a user action.
     * This would wrap the lower level webdriver interactions into a business level api method that searches for an invoice
     * @param smiNumber
     * @returns {Promise<void>}
     */
    async searchForInvoice(smiNumber) {
        await this.invoiceSearchInput.waitForDisplayed();
        await this.invoiceSearchInput.setValue(smiNumber);

        await this.invoiceSearchBtn.click();
        await this.waitForAnimation();
    }

    get loadPageElement() {
        return this.customCommandCenterBtn;
    }

    get customCommandCenterBtn() {
        return $('button=Customer Command Center');
    }

    /**
     * Avoid return multiple elements. These can be complex and problematic to deal with as beginners.
     * This is just an example -  avoid using $$
     * @returns {ReturnType<WebdriverIO.Browser["$$"]>}
     */
    get upcomingWorkFilters() {
        return $$("nav[class*=DashboardUpcomingWorkFilters-root] li");
    }

    /**
     * Notice that MUI adds classNames with random prefixes. Therefore we need use locators with partial css match
     * The follow selector finds a div with partial class and then the first input child
     * @returns {ReturnType<WebdriverIO.Browser["$"]> | jQuery | HTMLElement}
     */
    get invoiceSearchInput() {
        return $('div[class*="InvoiceSearch-searchValue"] input');
    }

    get invoiceSearchBtn() {
        return $('button=Search');
    }

    get firstInvoiceRow() {
       return $ (".react-grid-Canvas .react-grid-Row");
    }

    get filterClearBtn() {
        return $('div=Clear');
    }

}
