import LoginPage from "../../pageobjects/pwPortal/login.page";
import DashboardPage from "../../pageobjects/pwPortal/dashboard.page";

describe('PW Portal Dashboard Page', () => {
    const login = new LoginPage();
    const dashboard = new DashboardPage();

    before('should be able to login', async () => {
        await login.open();
        await login.msLogin();

        await dashboard.waitForPageLoad();
    });

    it('should display Upcoming work filters', async () => {
        const expectedFilterLabels = ['Package Review (0)', 'Invoice Review (1)', 'Turnback Response (1)', 'Payment Due (5)'];
        await dashboard.upcomingWorkFilters.forEach((filter, index) => {
             return expect(filter).toHaveTextContaining(expectedFilterLabels[index])
        })
    });

    it('should be able to search invoice by SMI ', async () => {
        const searchSMI = '71W';

        await dashboard.searchForInvoice(searchSMI);
        await expect(dashboard.firstInvoiceRow).toHaveTextContaining(['71W-CCA012796-02-LTM1', '770432', 'LTM', 'Air China', 'TB WITH SHOP', 'O&A WITH ANALYST', 'NO CREDIT']);
    });
});
