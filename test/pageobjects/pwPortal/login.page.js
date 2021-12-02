import BasePage from "../BasePage";

export default class LoginPage extends BasePage {
    constructor() {
        super({appName: 'pwPortal'});
    }

    get msLoginEmail() {
        return $('input[type="email"]');
    }

    get msLoginPassword() {
        return $('input[type="password"]');
    }

    get msNextBtn() {
        return $('#idSIButton9')
    }

    get msSubmitBtn() {
        return $('input[type="submit"]');
    }

   async msLogin(email = process.env.MS_EMAIL, password = process.env.MS_PASSWORD) {

        if(!email || !password) {
            throw new Error('--- Please set MS_EMAIL and MS_PASSWORD environment variables in .env file ---')
        }
         await this.msLoginEmail.setValue(email);
         await this.msNextBtn.click();

         await this.msLoginPassword.waitForEnabled();
         await this.msLoginPassword.setValue(password);

         // submit btn
         await this.msSubmitBtn.waitForClickable();
         await this.msSubmitBtn.click();

         // next btn
        this.waitForAnimation();
        await this.msSubmitBtn.waitForClickable();
        await this.msSubmitBtn.click();
   }
}
