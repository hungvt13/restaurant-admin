import { ShopAppPage } from './app.po';

describe('shop-app App', () => {
  let page: ShopAppPage;

  beforeEach(() => {
    page = new ShopAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
