var World = require("./singleton");

describe('Singleton', () => {
    test('World ensures invokation with new', () => {
        World;
    });
});