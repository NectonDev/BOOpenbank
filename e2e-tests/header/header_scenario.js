'use strict';

describe('Header Test: ', function() {
    it('Redirige automaticamente a /login cuando el usuario no esta logado', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/login");
    });
});

