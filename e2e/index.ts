import * as fs from 'fs';
import { Builder, By } from 'selenium-webdriver';

import { invitees } from './data';
import { HomePage } from './pages/home';


const driver = new Builder().forBrowser('chrome').build();
const homePage = new HomePage(driver);

homePage.open()
  .then(() => {

    try {

      homePage.addInvitee('Tony Stark');
      homePage.addInvitee('Thor Odinson');
      homePage.addInvitee('Bruce Banner');
      homePage.addInvitee('Steve Rogers');
      homePage.addInvitee('Stephen Strange');

      homePage.addInvitees(invitees);

      homePage.findInviteeByName('Steve Rogers').remove();

      homePage.findInviteeByName('Thor Odinson').toggleConfirmed();

      homePage.findInviteeByName('Stephen Strange').toggleConfirmed();

      homePage.confirmFirstInvitee();

      homePage.toggleNonRespondersVisibility();

      homePage.confirmedInvitees();

      driver.takeScreenshot().then((image) => {
        fs.writeFile('confirmed-invitees.png', image, 'base64', error => console.error(error));
      });

    } finally {
      driver.quit();
    }

  });