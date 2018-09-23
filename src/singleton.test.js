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
