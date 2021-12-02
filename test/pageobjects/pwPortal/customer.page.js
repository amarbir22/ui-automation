import BasePage from "../BasePage";

export default class CustomerPage extends BasePage {
    constructor() {
        super({appName: 'pwPortal'});
    }

    get loadPageElement() {
        return this.contractInfoLabel;
    }

    get contractInfoLabel() {
        return $('div=Contract Information')
    }

    get analystName() {
        return $('input[value=Amarbir]');
    }
 }
