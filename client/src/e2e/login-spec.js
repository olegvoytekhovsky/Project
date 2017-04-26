describe('Login test', function() {
    it('should log in application', function() {
      browser.get('http://localhost:8080/project');
      element(by.id('uName')).sendKeys('admin');
      element(by.id('pass')).sendKeys('password');
      element(by.id('loginButton')).click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/project/main-page',25000);
    });
});
