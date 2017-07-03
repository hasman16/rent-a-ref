import { RentARefPage } from './app.po';

describe('rent-a-ref App', function() {
  let page: RentARefPage;

  beforeEach(() => {
    page = new RentARefPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
