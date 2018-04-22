import { Builder, By } from 'selenium-webdriver';

import { invitees } from './data';
import HomePage from './pages/home';


const driver = new Builder().forBrowser('chrome').build();
const homePage = new HomePage(driver);

homePage.open()
  .then(() => {

    try {

      homePage.addInvitee('Tony Stark');
      homePage.addInvitee('Thor Odinson');
      homePage.addInvitee('Bruce Banner');
      homePage.addInvitee('Steve Rogers');

      homePage.addInvitees(invitees);

      homePage.removeInvitee('Steve Rogers');

      homePage.confirmFirstInvitee();

      homePage.toggleNonRespondersVisibility();

      homePage.confirmedInvitees();

    } finally {
      driver.quit();
    }

  });