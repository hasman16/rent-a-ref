import { $$, browser, element, by } from 'protractor';

export class Angular2FullStackPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarElement(n) {
    return $$('app-root a').get(n).getText();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

}
