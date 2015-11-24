'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Login Test', function() {
  it('Redirige automaticamente a /login cuando el usuario no esta logado', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });
});
