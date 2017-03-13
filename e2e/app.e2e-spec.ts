import { ScholarMean1Page } from './app.po';

describe('scholar-mean1 App', function() {
  let page: ScholarMean1Page;

  beforeEach(() => {
    page = new ScholarMean1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
