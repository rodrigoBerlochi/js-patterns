module.export = function World (options) {
    // ensure the constructor is always called with "new"
    if (!this instanceof World) {
        return new World();
    }
    
    // private prop to store the instance
    var instance = this;

    // constructor code
    this.name = options.name;

    // rewrite the constructor, now it only returns the previously 
    // created instance
    World = function () {
        return instance;
    };
};

/*
(function () {
    const oneWorld = new World({
        name: 'Earth'
    });

    const clonedWorld = new World({
        name: 'Saturn'
    });

    console.dir(oneWorld);

    console.log(oneWorld === clonedWorld);
    console.log(clonedWorld.name);
})();
*/
