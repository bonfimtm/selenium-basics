import { By, Key, ThenableWebDriver, WebElementPromise } from 'selenium-webdriver';

export class HomePage {

    private pageURL = 'http://127.0.0.1:8080/';
    private locators = {
        title: By.css('h1'),
        inviteeForm: By.css('#registrar'),
        inviteeNameField: By.css('#registrar input[name="name"]'),
        submitButton: By.css('#registrar button'),
        removeButton: By.css('#invitedList button + button'),
        lastRemoveButton: By.css('#invitedList li:last-child button:last-child'),
        firstInvited: By.css('#invitedList > li'),
        firstInvitedConfirm: By.css('#invitedList > li > label > input[type="checkbox"]'),
        hideCheckbox: By.css('.main > div > input[type="checkbox"]'),
        inviteeByName: name => By.xpath(`//span[text()="${name}"]/..`),
    };

    constructor(private driver: ThenableWebDriver) {
    }

    open() {
        return this.driver.get(this.pageURL);
    }

    addInvitees(invitees) {
        invitees.forEach(name => this.addInvitee(name));
    }

    addInvitee(name) {
        this.driver.findElement(this.locators.inviteeNameField).sendKeys(name, Key.RETURN);
    }

    confirmFirstInvitee() {
        const elmLiFirstItem = this.driver.findElement(this.locators.firstInvitedConfirm);
        elmLiFirstItem.click();
    }

    confirmedInvitees() {
        const elmLiFirstItem = this.driver.findElement(this.locators.firstInvited);
        elmLiFirstItem.isDisplayed().then(isDisplayed => console.log(isDisplayed));
    }

    toggleNonRespondersVisibility() {
        const elmInputHide = this.driver.findElement(this.locators.hideCheckbox);
        elmInputHide.click();
    }

    findInviteeByName(inviteeName) {
        const el = this.driver.findElement(this.locators.inviteeByName(inviteeName));
        return new Invitee(el);
    }

}

class Invitee {

    private locators = {
        removeButton: By.css('button:last-child'),
        confirmedCheckBox: By.css('input[type="checkbox"]'),
    }

    constructor(private element: WebElementPromise) {
    }

    remove() {
        this.element.findElement(this.locators.removeButton).click();
    }

    toggleConfirmed() {
        this.element.findElement(this.locators.confirmedCheckBox).click();
    }

}