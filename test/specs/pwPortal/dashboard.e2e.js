import LoginPage from "../../pageobjects/pwPortal/login.page";
import DashboardPage from "../../pageobjects/pwPortal/dashboard.page";
import CustomerPage from "../../pageobjects/pwPortal/customer.page";

describe('PW Portal Dashboard Page', () => {
    const login = new LoginPage();
    const dashboard = new DashboardPage();
    const customer = new CustomerPage();

    before('should be able to login', async () => {
        await login.open();
        await login.msLogin();

        await dashboard.waitForPageLoad();
    });


    describe('Invoice Filter', () => {
        it('should display Upcoming work filters', async () => {
            const expectedFilterLabels = ['Package Review', 'Invoice Review', 'Turnback Response', 'Payment Due'];
            await dashboard.upcomingWorkFilters.forEach((filter, index) => {
                return expect(filter).toHaveTextContaining(expectedFilterLabels[index])
            })
        });

        it('should be able to search invoice by SMI ', async () => {
            const searchSMI = '71W';

            await dashboard.searchForInvoice(searchSMI);
            await dashboard.invoiceSearchInput.clearValue();
            await expect(dashboard.firstInvoiceRow).toHaveTextContaining(['71W-CCA012796-02-LTM1', '770432', 'LTM', 'Air China', 'TB WITH SHOP', 'O&A WITH ANALYST', 'NO CREDIT']);
        });

        it('should clear search value', async () => {
            await dashboard.filterClearBtn.click();
            await dashboard.waitForAnimation();
            await expect(dashboard.invoiceSearchInput).toHaveValue('');
        });

        it('should show 0 Lines if search has no results', async () => {
            const searchSMI = 'show zero lines';

            await dashboard.searchForInvoice(searchSMI);
            await expect(dashboard.firstInvoiceRow).not.toBeDisplayed();
        });

        it('should navigate to customer command center', async () => {
            const searchSMI = 'show zero lines';

            await dashboard.customCommandCenterBtn.click();

            await customer.waitForPageLoad();

            await expect(customer.analystName).toHaveValue('Amarbir');
        });


    });

});
