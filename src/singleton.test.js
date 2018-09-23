/**
 * 
 * SINGLETON and forcing new for constructors
 * If a function constructor isn't called with
 * new, it won't return the expected object which
 * should be an instance of the constructor. It could
 * return nothing or some object but it won't be instance of
 * the constructor. 
 * Catch that scenario and return the constructor invokation with new. 
 * 
 * To get an ES5 singleton, at the end of the function body overwrite
 * the constructor function. The new function just will return the first
 * instance created leveraging the closure.
 */

// let's create a unique world...
function World (options) {
    // private prop to store the instance
    var instance = this;

    if (!(this instanceof World)) {
        return new World(options);
    }

    // constructor code
    this.name = options.name;
    this.moons = [];
    this.galaxy = options.galaxy;

    // rewrite the constructor, now it only returns the previously 
    // created instance
    World = function () {
        return instance;
    };
}

var op = {
    name: 'Earth',
    galaxy: 'Milky Way'
}
var Earth = World(op);

describe('Singleton tests', () => {

    test('if missing new keyword, it will enforce invoking as constructor', () => {
        expect(Earth).not.toBeUndefined();
        expect(Earth.constructor.name).toBe('World');
    });

    test('constructor returns always the same instance', () => {
        var maybeSaturn = new World({
            name: 'Saturn',
            galaxy: 'Milky Way'
        });

        expect(maybeSaturn.name).toBe('Earth');
        expect(maybeSaturn).toStrictEqual(Earth);
        expect(maybeSaturn === Earth).toBeTruthy();
    });
});
