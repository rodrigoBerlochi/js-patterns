/**
 * Strategy pattern
 * A single interface to be consumed by a client
 * that depending on the context, switches between
 * different algorithms
 * Those algorithms finally articules with a same set
 * of methods and same type of returned values (the interface) 
 */
var oauthModule = require('./strategy.utils/oauth');
var basicModule = require('./strategy.utils/oauth');
var onpremModule = require('./strategy.utils/oauth');

const AuthStrategy = (function (OauthModule, basicModule, onpremModule) {

    let strategy = null;

    const authStrategies = {
        oauth: oauthModule,
        basic: basicModule,
        onprem: onpremModule
    }

    const enumStrategy = {
        oauth: 'oauth',
        basic: 'basic',
        onprem: 'onprem'
    }

    const setAuthStrategy = (type) => {
        if (enumStrategy[type] === undefined) {
            throw new Error(type + ' does not exist in enumStrategy');
        }
        strategy = authStrategies[type];
        return enumStrategy[type]; // for testing 
    }

    return {
        enumStrategy: enumStrategy,
        setAuthStrategy: setAuthStrategy
    }
})(
    oauthModule,
    basicModule,
    onpremModule
);

 describe('Strategy tests', () => {

    test('module to have an enumeration', () => {
        expect(typeof AuthStrategy.enumStrategy).toBe('object')
        expect(AuthStrategy.enumStrategy.basic).toBe('basic');
    });

    test('module expose method to set change context', () => {
        expect(typeof AuthStrategy.setAuthStrategy).toBe('function');
        
        expect((function () {
            AuthStrategy.setAuthStrategy('cloudX');
        })).toThrowError('cloudX does not exist in enumStrategy');

        expect(
            AuthStrategy.setAuthStrategy(AuthStrategy.enumStrategy.oauth)
        ).toBe('oauth');
    });

 });