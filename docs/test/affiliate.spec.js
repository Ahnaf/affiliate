/* global it, describe, Affiliate, expect */

var optionOne = {
    log: true,
    tags: [
        {
            hosts: ['example.com', 'www.example.com'],
            query: {
                ref: 'my-tag'
            },
            replace: [
                {
                    from: 'ref-tag',
                    to: 'my-tag'
                },
                {
                    from: /ref-regex/g,
                    to: 'my-tag'
                }
            ],
            modify: function (url) {
                url.set('pathname', url.pathname + '-tag');
                url.set('hostname', 'tst.' + url.hostname);
                return url;
            }
        }
    ]
};

var optionTwo = {
    log: true,
    tags: [
        {
            hosts: ['example.org', 'shop.example.org'],
            query: {
                tag: 'my-tag2'
            },
            replace: [
                {
                    from: 'ref-tag2',
                    to: 'my-tag2'
                },
                {
                    from: /ref-regex/g,
                    to: 'my-tag2'
                }
            ],
            modify: function (url) {
                url.set('pathname', url.pathname + '-tag2');
                url.set('hostname', 'tst2.' + url.hostname);
                return url;
            }
        }
    ]
};

var createLink = function (href) {
    var a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('style', 'display: none;');
    document.body.appendChild(a);
    return a;
};

describe('Affiliate global', function () {
    it('is a function', function () {
        expect(typeof Affiliate).toEqual('function');
    });
    it('has all attributes', function () {
        expect(typeof Affiliate.instances).toEqual('function');
        expect(typeof Affiliate.detachAll).toEqual('function');
        expect(typeof Affiliate.revert).toEqual('function');
    });
    it('can get instances', function () {
        expect(typeof Affiliate.instances()).toEqual('object');
    });
});

describe('Affiliate instances', function () {
    it('have all attributes', function () {
        var aff = Affiliate(optionOne);
        expect(typeof aff.attach).toEqual('function');
        expect(typeof aff.detach).toEqual('function');
    });
    it('can attach and detach', function () {
        var aff = Affiliate(optionOne);
        aff.attach();
        aff.detach();
        Affiliate.revert();
        expect(true).toEqual(true);
    });
    it('can properly change links', function () {
        var link = createLink('https://www.example.com/ref-regex/');
        var linkTwo = createLink('https://example.org/ref-regex/');
        var aff = Affiliate(optionOne);
        aff.attach();
        expect(link.getAttribute('href')).toEqual('https://tst.www.example.com/my-tag/-tag?ref=my-tag');
        expect(linkTwo.getAttribute('href')).toEqual('https://example.org/ref-regex/');
        Affiliate.revert();

        link = createLink('https://example.com/ref-regex/');
        linkTwo = createLink('https://shop.example.org/ref-regex/');
        aff = Affiliate(optionTwo);
        aff.attach();
        expect(link.getAttribute('href')).toEqual('https://example.com/ref-regex/');
        expect(linkTwo.getAttribute('href')).toEqual('https://tst2.shop.example.org/my-tag2/-tag2?tag=my-tag2');
        Affiliate.revert();
    });
});

window.jasmine.getEnv().addReporter(new window.jasmine.JSReporter2());