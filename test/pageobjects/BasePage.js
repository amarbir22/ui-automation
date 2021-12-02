import {getAppUrl} from "../util/app.urls";

export default class BasePage {
    constructor (props) {
        this.baseUrl = getAppUrl(props.appName);
        this.appName = props.appName;
    }

        async open (path = '') {
        if(!this.baseUrl || typeof this.baseUrl !=='string') {
            throw new Error('Invalid URL passed - ${this.baseUrl}. Please check app environment is configured correctly. See readme for more details.');
        }

        const url = (path) ? '${this.baseUrl}/${path}' : this.baseUrl;
        console.log('+++ Loading URL: ${chalk.blue(url)}+++');
        await browser.url(url);
        await this.waitForPageLoad();
        await this.waitForAnimation();
    }

    async waitForPageLoad (opts ={}) {
        await browser.pause(500);
        await this.loadPageElement.waitForExist({timeout: opts.timeout || 30*1000});
        await this.waitForAnimation();
    }

    async waitForAnimation() {
        await browser.pause(300);
        await this.loaderSpinner.waitForDisplayed({reverse:true, timeout:30*1000});
    }

    get loadPageElement () {
        return $('head');
    }

    get loaderSpinner () {
        return $('.MuiBackdrop-root');
    }

    get siteBarLinksContainer () {
        return $('#sitebar')
    }

    navigateGlobalSitebar (linkText) {
        this.siteBarLinksContainer.waitForDisplayed({ timeout: 20 * 1000});
        const siteBarLink = this.siteBarLinksContainer.$('=${linkText}');
        siteBarLink.waitForClickable({ timeout: 20 * 1000});
        siteBarLink.click();
        this.waitForAnimation();
    }

    clearInput (elm) {
        browser.execute('arguments[0].value=\'\'',elm);
    }

    async getInputValues (elms) {
        const values = [];
        await elms[0].waitForExist();
        await this.waitForAnimation();

        elms.map((elm) => {
            if (elm.isDisplayed()) {
                values.push(elm.getValue());
            }
        });
        return values;
    }

    jsClick (elm) {
        const TIMEOUT = 1 * 1000;
        for (let i =1; i <= 5; i++) {
            browser.pause(TIMEOUT);
            try {
                browser.execute('arguments[0].click()',elm);
                break;
            } catch (err) {
                console.log('Retrying click on element ${elm} ${i * TIMEOUT / 1000}s');
            }
        }
    }

    switchWindow (window) {
        const TIMEOUT = 3 * 1000;

        for (let i = 1; i <= 5; i++) {
            browser.pause(TIMEOUT);
            try {
                browser.switchWindow(window);
                break;
            } catch (err) {
                console.log('Window: ${windows} was not available after ${i * TIMEOUT / 1000}s');
            }
        }
    }


};
