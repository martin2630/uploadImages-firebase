import { UploadFirebasePage } from './app.po';

describe('upload-firebase App', () => {
  let page: UploadFirebasePage;

  beforeEach(() => {
    page = new UploadFirebasePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
