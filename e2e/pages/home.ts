import { By, Key } from 'selenium-webdriver';

export default class HomePage {

    private driver;
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
        removeButtonForInvitee: invitee => By.xpath(`//span[text()="${invitee}"]/../button[last()]`),
    };

    constructor(driver) {
        this.driver = driver;
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

    removeInvitee(invitee) {
        this.driver.findElement(this.locators.removeButtonForInvitee(invitee)).click();
    }

}