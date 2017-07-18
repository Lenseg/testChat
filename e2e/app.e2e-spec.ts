import { TestChatPage } from './app.po';

describe('test-chat App', () => {
  let page: TestChatPage;

  beforeEach(() => {
    page = new TestChatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
